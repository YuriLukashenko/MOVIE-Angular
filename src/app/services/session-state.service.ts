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
}
