import {Poster} from '../shared/IPoster.model';
import {OnInit} from '@angular/core';

export class FavoriteService {

  posters: Poster[];

  constructor() {
    this.posters = this.getPostersFromLocalStorage();
  }

  getPostersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('posters'));
  }

  setPostersToLocalStorage(posters: Poster[]) {
    const serializedPosters = JSON.stringify(posters);
    localStorage.setItem('posters', serializedPosters);
  }

  isExistsInLocalStorage(id: number) {
    const poster = this.posters?.find(p => p.id === id);
    return poster !== null && poster !== undefined;
  }

  addToLocalStorage(poster: Poster) {
    if (!this.isExistsInLocalStorage(poster.id)) {
      if (this.posters === null) {
        this.posters = [];
      }
      this.posters.push(poster);
      this.setPostersToLocalStorage(this.posters);
    }
  }

  deleteFromLocalStorage(id: number) {
    const index = this.posters.findIndex(p => p.id === id);
    if (index > -1) {
      this.posters.splice(index, 1);
    }
    this.setPostersToLocalStorage(this.posters);
  }

  getPosterIndex(id: number) {
    const index = this.posters.findIndex(p => p.id === id);
    return index;
  }

  getNextPoster(index: number) {
    if (index === (this.posters.length - 1)) {
      return this.posters[0];
    } else {
      return this.posters[index + 1];
    }
  }
}
