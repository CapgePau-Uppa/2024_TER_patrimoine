import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarteComponent } from './carte.component';
import { DetailsModule } from "../details/details.module";
import { FiltersModule } from '../filters/filters.module';


@NgModule({
  declarations: [ CarteComponent ],
    imports: [
        CommonModule,
        HttpClientModule,
        DetailsModule,
        DetailsModule,
        FiltersModule
    ],
  exports: [ CarteComponent ]
})
export class CarteModule { }
