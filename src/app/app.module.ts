import { environment } from './../environments/environment';
import { TokenInterceptor } from './interceptors/token.interceptor';
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
import { RecommendComponent } from './components/recommend/recommend.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { LandingComponent } from './components/landing/landing.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityComponent } from './components/security/security.component';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    AllComponent,
    RecommendComponent,
    ReadingListComponent,
    LandingComponent,
    SecurityComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,
    FormsModule,
    NgbModule


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
