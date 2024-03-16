import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from "./home-admin.component";
import {NavbarModule} from "../navbar/navbar.module";



@NgModule({
  declarations: [ HomeAdminComponent ],
  imports: [
    CommonModule,
    NavbarModule
  ],
  exports: [ HomeAdminComponent ]
})
export class HomeAdminModule { }
