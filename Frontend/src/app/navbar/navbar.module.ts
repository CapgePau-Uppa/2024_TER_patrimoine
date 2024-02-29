import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";

import { NavbarComponent } from "./navbar.component";
import { ButtonModule } from "../button/button.module";
import { FiltersModule } from "../filters/filters.module";


@NgModule({
  declarations: [ NavbarComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,

    ButtonModule,
    FiltersModule
  ],
  exports: [ NavbarComponent]
})
export class NavbarModule {
}
