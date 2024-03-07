import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
<<<<<<< Updated upstream:Frontend/src/app/filters/filters.module.ts
import { FiltersComponent } from "./filters.component";
import { ButtonModule } from "../button/button.module";
=======
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from "./filters.component";
import { ButtonModule } from "../button/button.module";
import { FilterService } from './filters-service.model';
import { CarteModule } from '../carte/carte.module';
>>>>>>> Stashed changes:frontend-angular/src/app/filters/filters.module.ts



@NgModule({
  declarations: [ FiltersComponent ],
  imports: [
    CommonModule,
    ButtonModule,
<<<<<<< Updated upstream:Frontend/src/app/filters/filters.module.ts
    NgOptimizedImage
  ],
=======
    NgOptimizedImage,
    FormsModule,
  ],
  providers: [FilterService],
>>>>>>> Stashed changes:frontend-angular/src/app/filters/filters.module.ts
  exports: [ FiltersComponent ]
})
export class FiltersModule { }
