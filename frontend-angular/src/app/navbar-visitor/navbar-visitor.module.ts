import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { NavbarVisitorComponent } from './navbar-visitor.component';
import { ButtonModule } from "../button/button.module";



@NgModule({
  declarations: [
    NavbarVisitorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    NgOptimizedImage
  ],
  exports:[
    NavbarVisitorComponent
  ]
})
export class NavbarVisitorModule {

}
