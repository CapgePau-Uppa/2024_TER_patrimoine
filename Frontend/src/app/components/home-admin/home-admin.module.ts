import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from "./home-admin.component";
import { NavbarModule } from "../navbar/navbar.module";
import { SuggestionModule } from "../suggestion/suggestion.module";



@NgModule({
  declarations: [ HomeAdminComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    SuggestionModule
  ],
  exports: [ HomeAdminComponent ]
})
export class HomeAdminModule { }
