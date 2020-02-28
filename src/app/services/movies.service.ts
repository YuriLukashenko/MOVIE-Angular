import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MoviesService {
  constructor(private httpClient: HttpClient) {
  }
  APIKey = 'ebea8cfca72fdff8d2624ad7bbf78e4c';
  pageSize = 20;
  startPage = 1;

  getNowPlayingMoviesBy(pageId: number) {
    return this.httpClient.get(`http://api.themoviedb.org/3/movie/now_playing?api_key=${this.APIKey}&page=${pageId}`);
  }
}
