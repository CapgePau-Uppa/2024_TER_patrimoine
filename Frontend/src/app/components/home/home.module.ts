import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from "../navbar/navbar.module";
import { CarteModule } from "../carte/carte.module";
import { HomeComponent } from "./home.component";
import { FiltersModule } from "../filters/filters.module";



@NgModule({
  declarations: [ HomeComponent ],
    imports: [
        CommonModule,
        NavbarModule,
        CarteModule,
        FiltersModule
    ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
