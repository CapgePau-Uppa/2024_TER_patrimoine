import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from "./home-admin.component";
import { NavbarModule } from "../navbar/navbar.module";
import { SuggestionModule } from "../suggestion/suggestion.module";
import {ButtonModule} from "../button/button.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ HomeAdminComponent ],
  imports: [
    CommonModule,
    NavbarModule,
    SuggestionModule,
    ButtonModule,
    FormsModule
  ],
  exports: [ HomeAdminComponent ]
})
export class HomeAdminModule { }
