import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AddBatComponent } from "./components/add-bat/add-bat.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { HomeAdminComponent } from "./components/home-admin/home-admin.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-bat', component: AddBatComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'home-admin', component: HomeAdminComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
