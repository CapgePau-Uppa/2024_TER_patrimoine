// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";

// Components modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarteModule } from "./carte/carte.module";
import { ButtonModule } from "./button/button.module";
import { NavbarModule } from "./navbar/navbar.module";
import { HomeModule } from "./home/home.module";
import { FiltersModule } from './filters/filters.module';
import { DetailsModule } from './details/details.module';
import { AddBatModule } from "./add-bat/add-bat.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [ ],
    bootstrap: [ AppComponent ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule,
      NgOptimizedImage,

      CarteModule,
      ButtonModule,
      NavbarModule,
      HomeModule,
      FiltersModule,
      DetailsModule,
      AddBatModule
    ]
})
export class AppModule { }
