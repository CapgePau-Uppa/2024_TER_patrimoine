import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//const routes: Routes = [{ path: 'parametre', loadChildren: () => import('./parametre/parametre.module').then(m => m.ParametreModule) }, { path: 'liste', loadChildren: () => import('./liste/liste.module').then(m => m.ListeModule) }];

@NgModule({
  imports: [RouterModule],//.forRoot(routes)
  exports: [RouterModule]
})
export class AppRoutingModule { }
