import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FiltersComponent } from "./filters.component";
import { ButtonModule } from "../button/button.module";



@NgModule({
  declarations: [ FiltersComponent ],
  imports: [
    CommonModule,
    ButtonModule,
    NgOptimizedImage
  ],
  exports: [ FiltersComponent ]
})
export class FiltersModule { }
