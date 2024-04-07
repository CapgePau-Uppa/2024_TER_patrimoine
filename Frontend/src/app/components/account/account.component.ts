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
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  constructor( private router: Router, public globalService: GlobalService) {}

}
