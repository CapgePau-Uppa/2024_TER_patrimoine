import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { NavbarUserComponent } from "./navbar-user.component";
import { RouterLink } from "@angular/router";
import { FiltersWindowModule } from "../filters-window/filters-window.module";


@NgModule({
  declarations: [ NavbarUserComponent ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    FiltersWindowModule ],
  exports: [ NavbarUserComponent]
})
export class NavbarUserModule { }
