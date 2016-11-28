import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes.component'
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from "./hero.service";
import { DashboardComponent } from './dashboard.component';

import { AppRoutingModule } from "./app-routing.module";

import { HeroSearchComponent } from "./hero-search.component";

import './rxjs-extensions'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }

