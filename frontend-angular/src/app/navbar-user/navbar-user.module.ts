import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NavbarUserComponent} from "./navbar-user.component";



@NgModule({
  declarations: [
    NavbarUserComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarUserComponent
  ]
})
export class NavbarUserModule { }
