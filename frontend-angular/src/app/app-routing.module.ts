import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeVisitorComponent } from "./home-visitor/home-visitor.component";
import { HomeUserComponent } from "./home-user/home-user.component";
import { HomeAdminComponent } from "./home-admin/home-admin.component";

const routes: Routes = [
  { path: 'home-visitor', component: HomeVisitorComponent },
  { path: 'home-user', component: HomeUserComponent },
  { path: 'home-admin', component: HomeAdminComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
