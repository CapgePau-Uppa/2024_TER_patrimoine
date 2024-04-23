// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from "@angular/common";

// Components modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarteModule } from "./components/carte/carte.module";
import { ButtonModule } from "./components/button/button.module";
import { NavbarModule } from "./components/navbar/navbar.module";
import { HomeModule } from "./components/home/home.module";
import { FiltersModule } from './components/filters/filters.module';
import { AddBatModule } from "./components/add-bat/add-bat.module";
import { ConnexionModule } from "./components/connexion/connexion.module";
import { HomeAdminModule } from "./components/home-admin/home-admin.module";
import { SuggestionModule } from "./components/suggestion/suggestion.module";

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
      AddBatModule,
      ConnexionModule,
      HomeAdminModule,
      SuggestionModule
    ]
})
export class AppModule { }
