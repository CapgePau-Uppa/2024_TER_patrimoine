// Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";
//import { ServiceWorkerModule } from "@angular/service-worker";


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
      /*RouterModule,
      NgOptimizedImage,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      }),*/

      CarteModule,
      ButtonModule,
      NavbarModule,
      HomeModule,
      FiltersModule,
      DetailsModule,
      AddBatModule,


    ]
})
export class AppModule { }
