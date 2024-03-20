import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AddBatComponent } from "./components/add-bat/add-bat.component";
import { ConnexionComponent } from "./components/connexion/connexion.component";
import { HomeAdminComponent } from "./components/home-admin/home-admin.component";
import { AccountComponent } from "./components/account/account.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-bat', component: AddBatComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'account', component: AccountComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
