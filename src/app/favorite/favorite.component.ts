import { Component, OnInit } from '@angular/core';
import {FavoriteService} from '../services/favorite.service';
import {Poster} from '../shared/IPoster.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  posters: Poster[];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.posters = this.favoriteService.getPostersFromLocalStorage();
    console.log(this.posters);
  }

  onUnfavoriteClick(id: number) {
    this.favoriteService.deleteFromLocalStorage(id);
    this.posters = this.favoriteService.getPostersFromLocalStorage();
  }
}
