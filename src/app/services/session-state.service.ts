import {Injectable} from '@angular/core';
import {Poster} from '../shared/IPoster.model';

@Injectable()
export class SessionStateService {
  poster: Poster;

  getCurrentPoster() {
    return this.poster;
  }

  setCurrentPoster(poster: Poster) {
    this.poster = poster;
  }
}
