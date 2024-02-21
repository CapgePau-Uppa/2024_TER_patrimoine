import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { NavbarUserComponent } from "./navbar-user.component";
import { RouterLink } from "@angular/router";


@NgModule({
  declarations: [ NavbarUserComponent ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink ],
  exports: [ NavbarUserComponent ]
})
export class NavbarUserModule { }
