import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NowPlaying } from '../models/movies';

export interface Poster {
  fullImagePath: string;
  id: number;
  name: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MoviesService]
})
export class MainComponent implements OnInit {

  constructor(private moviesService: MoviesService) {
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
      this.posters.push(posterView);
    });
  }

  ngOnInit() {
    this.pageSize = this.moviesService.pageSize;
    this.page = 1;
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
}
