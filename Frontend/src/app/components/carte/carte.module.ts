import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarteComponent } from './carte.component';
import { FiltersModule } from '../filters/filters.module';
import {ButtonModule} from "../button/button.module";
import { NavbarModule } from '../navbar/navbar.module';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [ CarteComponent,
   ],
    imports: [
        CommonModule,
        HttpClientModule,
        FiltersModule,
        ButtonModule,
        NavbarModule,
        RouterLink
    ],
  exports: [ CarteComponent ]
})
export class CarteModule { }
