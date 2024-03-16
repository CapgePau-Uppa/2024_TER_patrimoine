import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from "./filters.component";
import { ButtonModule } from "../button/button.module";
import { FilterService } from './filters-service.model';

@NgModule({
  declarations: [ FiltersComponent ],
  imports: [
    CommonModule,
    ButtonModule,
    NgOptimizedImage,
    FormsModule,
  ],
  providers: [FilterService],
  exports: [ FiltersComponent ]
})
export class FiltersModule { }
