import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";

import { NavbarComponent } from "./navbar.component";
import { ButtonModule } from "../button/button.module";
import { FiltersModule } from "../filters/filters.module";
import { DetailsModule } from "../details/details.module";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ NavbarComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    

    ButtonModule,
    FiltersModule,
    DetailsModule
  ],
  exports: [ NavbarComponent]
})
export class NavbarModule {
}
