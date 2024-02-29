import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AddBatComponent } from "./add-bat/add-bat.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-bat', component: AddBatComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
