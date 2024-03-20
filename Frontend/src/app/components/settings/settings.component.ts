import { Component } from '@angular/core';
import {NavbarModule} from "../navbar/navbar.module";
import {ButtonModule} from "../button/button.module";
import {Router} from "@angular/router";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NavbarModule,
    ButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor( private router: Router, public globalService: GlobalService) {}

  deconnect() {
    this.globalService.globalVariable = 0;
    this.router.navigate(['../']);
  }
}
