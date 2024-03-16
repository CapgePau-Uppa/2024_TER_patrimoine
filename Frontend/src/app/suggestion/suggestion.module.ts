import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionComponent } from "./suggestion.component";



@NgModule({
  declarations: [ SuggestionComponent ],
  imports: [
    CommonModule
  ],
  exports: [ SuggestionComponent ]
})
export class SuggestionModule { }
