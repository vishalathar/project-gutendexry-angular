import { SearchComponent } from './components/search/search.component';
import { SecurityComponent } from './components/security/security.component';
import { AllComponent } from './components/all/all.component';
import { MainComponent } from './components/main/main.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendComponent } from './components/recommend/recommend.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  // rewriting
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'main', component: MainComponent, canActivate:[AuthGuard]}, // http:localhost:4200/main // route/auth guards canActivate
  {path: 'all', component: AllComponent, canActivate:[AuthGuard]},
  {path: 'recommend', component: RecommendComponent, canActivate:[AuthGuard]},
  {path: 'readlist', component: ReadingListComponent, canActivate:[AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LandingComponent},
  //{path: 'landing', component: LandingComponent},
  {path: '**', component: MainComponent, canActivate:[AuthGuard]} // this is a wild card, must be last. to handle unknown paths


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
