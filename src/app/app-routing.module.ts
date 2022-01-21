import { SecurityComponent } from './components/security/security.component';
import { AllComponent } from './components/all/all.component';
import { MainComponent } from './components/main/main.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // rewriting
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'main', component: MainComponent}, // http:localhost:4200/main // route/auth guards canActivate
  {path: 'all', component: AllComponent},

  {path: 'login', component: LandingComponent},

  //{path: 'landing', component: LandingComponent},
  {path: '**', component: MainComponent} // this is a wild card, must be last. to handle unknown paths

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
