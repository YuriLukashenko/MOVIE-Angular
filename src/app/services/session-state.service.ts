import {Injectable} from '@angular/core';
import {Poster} from '../shared/IPoster.model';
import {MoviesService} from './movies.service';
import {NowPlaying} from '../shared/INow-playing.response';
import {RoutePagesEnum} from '../shared/routePages.emun';

@Injectable()
export class SessionStateService {
  posters: Poster[];
  poster: Poster;
  pageNum = 1;
  prevRoutePage: RoutePagesEnum;

  constructor(private moviesService: MoviesService) {
    this.prevRoutePage = RoutePagesEnum.main;
  }

  getCurrentPoster() {
    return this.poster;
  }

  setCurrentPoster(poster: Poster) {
    this.poster = poster;
  }

  setCurrentPage(page: number) {
    this.pageNum = page;
  }

  getCurrentPage() {
    return this.pageNum;
  }

  getPreviousRoutePage() {
    return this.prevRoutePage;
  }

  setPreviousRoutePage(routePage: RoutePagesEnum){
    this.prevRoutePage = routePage;
  }

  getNextPoster() {
    if (this.poster.positionOfIteration === this.moviesService.pageSize) {
      this.pageNum++;
      this.moviesService.getNowPlayingMoviesBy(this.pageNum)
        .subscribe((data: NowPlaying) => {
          this.moviesService.convertNowPlayingToPosters(data);
          this.posters = this.moviesService.getPosters();
          this.poster = this.posters[0];
          return this.poster;
        });
    } else {
      this.poster = this.posters.find(p => p.positionOfIteration === this.poster.positionOfIteration + 1);
      return this.poster;
    }
  }

}
