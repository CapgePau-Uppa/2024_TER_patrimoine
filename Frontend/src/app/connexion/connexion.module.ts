import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarModule } from "../navbar/navbar.module";
import { ButtonModule } from "../button/button.module";
import { ConnexionComponent } from "./connexion.component";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [ ConnexionComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    ButtonModule,
    NgOptimizedImage,
    RouterLink
  ],
  exports: [ ConnexionComponent ]
})
export class ConnexionModule { }
