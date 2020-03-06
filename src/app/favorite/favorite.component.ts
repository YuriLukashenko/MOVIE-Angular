import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../services/favorite.service';
import {Poster} from '../shared/IPoster.model';
import {SessionStateService} from '../services/session-state.service';
import {RoutePagesEnum} from '../shared/routePages.emun';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  posters: Poster[];
  width: number;
  lineClamp: number;

  constructor(private favoriteService: FavoriteService, private sessionStateService: SessionStateService) { }

  ngOnInit() {
    this.posters = this.favoriteService.getPostersFromLocalStorage();
    this.width = window.innerWidth;
    this.lineClamp = this.calculateLineClamp(this.width);
  }

  calculateLineClamp(width: number) {
    if (width > 200) {
      return Math.round( (width - 220) / 20);
    }
    return 0;
  }

  onUnfavoriteClick(id: number) {
    this.favoriteService.deleteFromLocalStorage(id);
    this.posters = this.favoriteService.getPostersFromLocalStorage();
  }

  onPosterSelected(poster: Poster) {
    this.sessionStateService.setCurrentPoster(poster);
    this.sessionStateService.setPreviousRoutePage(RoutePagesEnum.favorite);
  }

  onResize(event) {
    this.width = window.innerWidth;
    this.lineClamp = this.calculateLineClamp(this.width);
  }
}
