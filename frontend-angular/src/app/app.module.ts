// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components modules
import { HomeVisitorModule } from "./home-visitor/home-visitor.module";
import { CarteModule } from "./carte/carte.module";
import { NavbarUserModule } from "./navbar-user/navbar-user.module";
import { HomeUserModule } from "./home-user/home-user.module";
import { NavbarVisitorModule } from "./navbar-visitor/navbar-visitor.module";
import { ButtonModule } from "./button/button.module";
import { FiltersWindowModule } from "./filters-window/filters-window.module";

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

      HomeVisitorModule,
      HomeUserModule,

      NavbarVisitorModule,
      NavbarUserModule,

      CarteModule,
      ButtonModule,
      FiltersWindowModule

  ]
})
export class AppModule { }
