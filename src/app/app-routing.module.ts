import { AllComponent } from './components/all/all.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent}, // http:localhost:4200/main
  {path: 'all', component: AllComponent},
  {path: '**', component: MainComponent} // this is a wild card, must be last. to handle unknown paths

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
