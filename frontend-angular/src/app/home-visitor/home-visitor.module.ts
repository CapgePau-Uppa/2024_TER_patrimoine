import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeVisitorComponent } from "./home-visitor.component";

import { NavbarVisitorModule } from "../navbar-visitor/navbar-visitor.module";
import { CarteModule } from "../carte/carte.module";


@NgModule({
  declarations: [ HomeVisitorComponent ],
  imports: [
    CommonModule,
    NavbarVisitorModule,
    CarteModule
  ],
  exports: [ HomeVisitorComponent ]
})
export class HomeVisitorModule { }
