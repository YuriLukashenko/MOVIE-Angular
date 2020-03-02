import {Injectable} from '@angular/core';
import {Poster} from '../shared/IPoster.model';
import {MoviesService} from './movies.service';
import {NowPlaying} from '../shared/INow-playing.response';

@Injectable()
export class SessionStateService {
  posters: Poster[];
  poster: Poster;
  page = 1;

  constructor(private moviesService: MoviesService) {
  }

  getCurrentPoster() {
    return this.poster;
  }

  setCurrentPoster(poster: Poster) {
    this.poster = poster;
  }

  setCurrentPage(page: number) {
    this.page = page;
  }

  getCurrentPage() {
    return this.page;
  }

  getNextPoster() {

    if (this.poster.positionOfIteration === this.moviesService.pageSize) {
      this.page++;
      this.moviesService.getNowPlayingMoviesBy(this.page)
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
