import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { MainComponent } from './app/main/main.component';
import { DetailComponent } from './app/detail/detail.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'details', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
