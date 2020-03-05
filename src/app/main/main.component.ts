import {Component, OnInit} from '@angular/core';
import {MoviesService} from 'src/app/services/movies.service';
import {NowPlaying} from '../shared/INow-playing.response';
import {Poster} from '../shared/IPoster.model';
import {SessionStateService} from '../services/session-state.service';
import {RoutePagesEnum} from '../shared/routePages.emun';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
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

  ngOnInit() {
    this.pageSize = this.moviesService.pageSize;
    this.page = this.sessionStateService.getCurrentPage();
    this.maxSize = this.isSmallMobileDevice.matches ? 1 : 3;
    this.isBoundaryLinks = !this.isSmallMobileDevice.matches;

    this.moviesService.getNowPlayingMoviesBy(this.page)
      .subscribe((data: NowPlaying) => {
        this.moviesService.convertNowPlayingToPosters(data);
        this.nowPlaying = this.moviesService.getNowPlaying();
        this.posters = this.moviesService.getPosters();
      });
  }

  onPageChange(pageNumber) {
    this.moviesService.getNowPlayingMoviesBy(pageNumber)
      .subscribe((data: NowPlaying) => {
        this.moviesService.convertNowPlayingToPosters(data);
        this.nowPlaying = this.moviesService.getNowPlaying();
        this.posters = this.moviesService.getPosters();
        this.sessionStateService.setCurrentPage(pageNumber);
      });
  }

  onResize(event) {
    this.maxSize = this.isSmallMobileDevice.matches ? 1 : 3;
    this.isBoundaryLinks = !this.isSmallMobileDevice.matches;
  }

  onPosterSelected(poster: Poster) {
    this.sessionStateService.setCurrentPoster(poster);
    this.sessionStateService.setCurrentPage(this.page);
    this.sessionStateService.setPreviousRoutePage(RoutePagesEnum.main);
  }
}
