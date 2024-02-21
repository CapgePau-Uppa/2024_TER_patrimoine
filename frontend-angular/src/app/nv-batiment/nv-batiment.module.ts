import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NvBatimentComponent } from './nv-batiment.component';
import {ButtonModule} from "../button/button.module";
import {CarteModule} from "../carte/carte.module";
import {NavbarVisitorModule} from "../navbar-visitor/navbar-visitor.module";



@NgModule({
  declarations: [
    NvBatimentComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CarteModule,
    NavbarVisitorModule
  ]
})
export class NvBatimentModule { }
