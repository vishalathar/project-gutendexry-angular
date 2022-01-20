import { NgModule } from '@angular/core';
import {Component, ViewEncapsulation} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllComponent } from './components/all/all.component';
import { HttpClientModule } from '@angular/common/http';
import { RecommendComponent } from './components/recommend/recommend.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    AllComponent,
    RecommendComponent,
    ReadingListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
