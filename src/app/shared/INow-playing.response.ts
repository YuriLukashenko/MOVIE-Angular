import {Movie} from './IMovie.responce';

export interface NowPlaying {
  page: number;
  results: Movie[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}
