import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AddBatComponent } from "./add-bat/add-bat.component";
import { ConnexionComponent } from "./connexion/connexion.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-bat', component: AddBatComponent },
  { path: 'connexion', component: ConnexionComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
