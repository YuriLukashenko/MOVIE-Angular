import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../shared/IMovie.responce';
import {Poster} from '../shared/IPoster.model';
import {NowPlaying} from '../shared/INow-playing.response';

@Injectable()
export class MoviesService {
  constructor(private httpClient: HttpClient) {
  }
  APIKey = 'ebea8cfca72fdff8d2624ad7bbf78e4c';
  pageSize = 20;
  nowPlaying: NowPlaying;
  posters: Poster[] = [];

  getNowPlaying() {
    return this.nowPlaying;
  }
  getPosters() {
    return this.posters;
  }
  getPageSize() {
    return this.pageSize;
  }

  getNowPlayingMoviesBy(pageId: number) {
    return this.httpClient.get(`http://api.themoviedb.org/3/movie/now_playing?api_key=${this.APIKey}&page=${pageId}`);
  }

  convertNowPlayingToPosters(data) {
    this.nowPlaying = data;
    this.posters = [];
    let i = 1;
    this.nowPlaying.results.forEach((movie) => {
      const posterView = this.convertMovieToPoster(movie);
      posterView.positionOfIteration = i;
      i++;
      this.posters.push(posterView);
    });
  }

  convertMovieToPoster(movie: Movie) {
    const posterView = {} as Poster;
    posterView.id = movie.id;
    posterView.name = movie.title;
    posterView.fullImagePath = 'http://image.tmdb.org/t/p/w342' + movie.poster_path;
    if (movie.backdrop_path == null) {
      posterView.fullBackgroundPath = 'http://image.tmdb.org/t/p/w500' + movie.poster_path;
    } else {
      posterView.fullBackgroundPath = 'http://image.tmdb.org/t/p/w500' + movie.backdrop_path;
    }
    posterView.score = movie.vote_average;
    posterView.rating = movie.adult ? 'R' : 'G';
    posterView.release_date = new Date(movie.release_date);
    posterView.overview = movie.overview;
    return posterView;
  }
}
