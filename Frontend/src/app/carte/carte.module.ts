import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarteComponent } from './carte.component';
import {DetailsModule} from "../details/details.module";


@NgModule({
  declarations: [ CarteComponent ],
    imports: [
        CommonModule,
        HttpClientModule,
        DetailsModule
    ],
  exports: [ CarteComponent ]
})
export class CarteModule { }
