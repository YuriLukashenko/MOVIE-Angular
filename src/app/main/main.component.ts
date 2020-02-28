import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NowPlaying } from '../shared/INow-playing.response';
import { Poster } from '../shared/IPoster.model';
import { SessionStateService } from '../services/session-state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MoviesService]
})
export class MainComponent implements OnInit {

  constructor(private moviesService: MoviesService, private sessionStateService: SessionStateService) {
  }

  nowPlaying: NowPlaying;
  posters: Poster[] = [];
  pageSize: number;
  page: number;
  maxSize = 3;
  isBoundaryLinks: boolean;
  isSmallMobileDevice: MediaQueryList = window.matchMedia('(max-width: 768px)');

  fetchData(data) {
    this.posters = [];
    this.nowPlaying = data;
    this.nowPlaying.results.forEach((movie) => {
      const posterView = {} as Poster;
      posterView.id = movie.id;
      posterView.name = movie.title;
      posterView.fullImagePath = 'http://image.tmdb.org/t/p/w342' + movie.poster_path;
      posterView.fullBackgroundPath = 'http://image.tmdb.org/t/p/w500' + movie.backdrop_path;
      this.posters.push(posterView);
    });
  }

  ngOnInit() {
    this.pageSize = this.moviesService.pageSize;
    this.page = this.moviesService.startPage;
    this.maxSize = this.isSmallMobileDevice.matches ? 1 : 3;
    this.isBoundaryLinks = !this.isSmallMobileDevice.matches;

    this.moviesService.getNowPlayingMoviesBy(this.page)
      .subscribe((data: NowPlaying) => this.fetchData(data));
  }

  onPageChange(pageNumber) {
    this.moviesService.getNowPlayingMoviesBy(pageNumber)
      .subscribe((data: NowPlaying) => this.fetchData(data));
  }

  onResize(event) {
    this.maxSize = this.isSmallMobileDevice.matches ? 1 : 3;
    this.isBoundaryLinks = !this.isSmallMobileDevice.matches;
  }

  onPosterSelected(poster: Poster) {
    this.sessionStateService.setCurrentPoster(poster);
  }
}
