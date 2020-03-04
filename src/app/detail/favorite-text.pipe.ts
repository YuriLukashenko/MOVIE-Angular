import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appFavoriteText'
})
export class FavoriteTextPipe implements PipeTransform{
  transform(isFavorite: boolean): any {
    return isFavorite ? '&#10003; Added to favorite' : 'Add to favorite';
  }
}
