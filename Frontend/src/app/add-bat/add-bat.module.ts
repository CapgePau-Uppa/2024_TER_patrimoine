import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AddBatComponent } from "./add-bat.component";
import { ButtonModule } from "../button/button.module";
import {NavbarModule} from "../navbar/navbar.module";



@NgModule({
  declarations: [ AddBatComponent ],
  imports: [
    CommonModule,
    ButtonModule,
    NgOptimizedImage,
    NavbarModule
  ],
  exports: [ AddBatComponent ]
})
export class AddBatModule { }
