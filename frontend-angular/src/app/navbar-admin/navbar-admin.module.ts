import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarAdminComponent } from './navbar-admin.component';


@NgModule({
  declarations: [
    NavbarAdminComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavbarAdminComponent
  ]
})
export class NavbarAdminModule { }
