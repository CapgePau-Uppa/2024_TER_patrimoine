// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components modules
import { CarteModule } from './carte/carte.module';
import { ButtonModule } from './button/button.module';
import { NavbarAdminModule } from "./navbar-admin/navbar-admin.module";
import { NavbarUserModule } from "./navbar-user/navbar-user.module";
import { NavbarVisitorModule } from "./navbar-visitor/navbar-visitor.module";

@NgModule({
    declarations: [
        AppComponent,

    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,

        CarteModule,
        ButtonModule,
        NavbarAdminModule,
        NavbarUserModule,
        NavbarVisitorModule

    ]
})
export class AppModule { }
