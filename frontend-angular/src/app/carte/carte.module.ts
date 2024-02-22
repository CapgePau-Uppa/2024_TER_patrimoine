import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarteComponent } from './carte.component';


@NgModule({
  declarations: [ CarteComponent ],
  imports: [ 
  CommonModule,
  HttpClientModule 
  ],
  exports: [ CarteComponent ]
})
export class CarteModule { }
