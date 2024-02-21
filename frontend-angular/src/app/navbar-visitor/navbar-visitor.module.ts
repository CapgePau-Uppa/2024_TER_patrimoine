import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { NavbarVisitorComponent } from './navbar-visitor.component';
import { ButtonModule } from "../button/button.module";
import { RouterLink } from "@angular/router";


@NgModule({
  declarations: [ NavbarVisitorComponent ],
    imports: [
        CommonModule,
        ButtonModule,
        NgOptimizedImage,
        RouterLink
    ],
  exports:[ NavbarVisitorComponent ]
})
export class NavbarVisitorModule { }
