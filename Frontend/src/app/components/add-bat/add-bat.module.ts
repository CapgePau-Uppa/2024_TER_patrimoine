import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AddBatComponent } from "./add-bat.component";
import { ButtonModule } from "../button/button.module";
import { NavbarModule} from "../navbar/navbar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterService } from "../filters/filters-service.model";
import { RouterLink } from "@angular/router";

@NgModule({
  declarations: [ AddBatComponent ],
    imports: [
        CommonModule,
        ButtonModule,
        NgOptimizedImage,
        NavbarModule,
        ReactiveFormsModule,
        FormsModule,
        RouterLink
    ],
  providers: [FilterService],
  exports: [ AddBatComponent ]
})
export class AddBatModule { }
