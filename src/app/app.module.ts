import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule } from './app-routing.module';
import { SessionStateService } from './services/session-state.service';
import { MoviesService } from './services/movies.service';
import { HeaderComponent } from './header/header.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FavoriteTextPipe } from './detail/favorite-text.pipe';
import {FavoriteService} from './services/favorite.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailComponent,
    HeaderComponent,
    FavoriteComponent,
    FavoriteTextPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [SessionStateService, MoviesService, FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
