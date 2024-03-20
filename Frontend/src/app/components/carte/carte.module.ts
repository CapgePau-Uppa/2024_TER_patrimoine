import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarteComponent } from './carte.component';
import { DetailsModule } from "../details/details.module";
import { FiltersModule } from '../filters/filters.module';
import {ButtonModule} from "../button/button.module";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [ CarteComponent ],
    imports: [
        CommonModule,
        HttpClientModule,
        DetailsModule,
        FiltersModule,
        ButtonModule,
        RouterLink
    ],
  exports: [ CarteComponent ]
})
export class CarteModule { }
