import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NavbarModule } from "../navbar/navbar.module";
import { ButtonModule } from "../button/button.module";
import { ConnexionComponent } from "./connexion.component";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [ ConnexionComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    ButtonModule,
    RouterLink,
    FormsModule
  ],
  exports: [ ConnexionComponent ]
})
export class ConnexionModule { }
