import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Poster} from '../shared/IPoster.model';
import {SessionStateService} from '../services/session-state.service';
import {NowPlaying} from '../shared/INow-playing.response';
import {MoviesService} from '../services/movies.service';
import {FavoriteService} from '../services/favorite.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  poster: Poster;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private sessionStateService: SessionStateService,
              private moviesService: MoviesService,
              private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.poster = this.sessionStateService.getCurrentPoster();

    // for test (random view)
    // this.moviesService.getNowPlayingMoviesBy(Math.floor(Math.random() * 57))
    //   .subscribe((data: NowPlaying) => {
    //     this.moviesService.convertNowPlayingToPosters(data);
    //     this.poster = this.moviesService.getPosters()[Math.floor(Math.random() * 20)];
    //   });
  }

  nextMovie() {
    const posters = this.moviesService.getPosters();
    let page = this.sessionStateService.getCurrentPage();

    // if it the last movie of page
    if (this.poster.positionOfIteration === this.moviesService.getPageSize()) {
      page++;
      this.sessionStateService.setCurrentPage(page);
      this.moviesService.getNowPlayingMoviesBy(page)
        .subscribe((data: NowPlaying) => {
          this.moviesService.convertNowPlayingToPosters(data);
          this.poster = this.moviesService.getPosters()[0];
          });
      } else {
        this.poster = this.moviesService.getPosters().find(p => p.positionOfIteration === this.poster.positionOfIteration + 1);
      }
  }

  onFavoriteClick() {
    this.poster.isFavorite = true;
    this.favoriteService.addToLocalStorage(this.poster);
  }
}
