import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarteComponent } from './carte.component';
import { DetailsModule } from "../details/details.module";
<<<<<<< Updated upstream:Frontend/src/app/carte/carte.module.ts
=======
import { FiltersModule } from '../filters/filters.module';

>>>>>>> Stashed changes:frontend-angular/src/app/carte/carte.module.ts


@NgModule({
  declarations: [ CarteComponent ],
    imports: [
        CommonModule,
        HttpClientModule,
<<<<<<< Updated upstream:Frontend/src/app/carte/carte.module.ts
        DetailsModule
=======
        DetailsModule,
        FiltersModule
>>>>>>> Stashed changes:frontend-angular/src/app/carte/carte.module.ts
    ],
  exports: [ CarteComponent ]
})
export class CarteModule { }
