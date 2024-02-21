import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeUserComponent } from "./home-user.component";

import { CarteModule } from "../carte/carte.module";
import { ButtonModule } from "../button/button.module";
import { NavbarUserModule } from "../navbar-user/navbar-user.module";
import {NavbarVisitorModule} from "../navbar-visitor/navbar-visitor.module";


@NgModule({
  declarations: [ HomeUserComponent ],
    imports: [
        CommonModule,
        CarteModule,
        ButtonModule,
        NavbarUserModule,
        NavbarVisitorModule
    ],
  exports: [ HomeUserComponent ]
})
export class HomeUserModule { }
