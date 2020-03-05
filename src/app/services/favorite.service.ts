import {Poster} from '../shared/IPoster.model';
import {OnInit} from '@angular/core';

export class FavoriteService {

  posters: Poster[];

  constructor() {
    this.posters = this.getPostersFromLocalStorage();
    console.log('lol');
  }

  getPostersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('posters'));
  }

  setPostersToLocalStorage(posters: Poster[]) {
    const serializedPosters = JSON.stringify(posters);
    localStorage.setItem('posters', serializedPosters);
  }

  isExistsInLocalStorage(id: number) {
    const posters: Poster[] = this.getPostersFromLocalStorage();
    const poster = posters?.find(p => p.id === id);
    console.log(poster);
    return poster !== null && poster !== undefined;
  }

  addToLocalStorage(poster: Poster) {
    if (!this.isExistsInLocalStorage(poster.id)) {
      let posters: Poster[] = this.getPostersFromLocalStorage();
      if (posters === null) {
        posters = [];
      }
      posters.push(poster);
      this.setPostersToLocalStorage(posters);
    }
  }

  deleteFromLocalStorage(id: number) {
    const posters: Poster[] = this.getPostersFromLocalStorage();
    const index = posters.findIndex(p => p.id === id);
    if (index > -1) {
      posters.splice(index, 1);
    }
    this.setPostersToLocalStorage(posters);
  }

  getPosterIndex(id: number) {
    const posters: Poster[] = this.getPostersFromLocalStorage();
    const index = posters.findIndex(p => p.id === id);
    return index;
  }

  getNextPoster(index: number) {
    const posters: Poster[] = this.getPostersFromLocalStorage();
    if (index === (posters.length - 1)) {
      return posters[0];
    } else {
      return posters[index + 1];
    }
  }
}
