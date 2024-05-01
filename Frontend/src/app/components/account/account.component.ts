import { Component } from '@angular/core';
import {NavbarModule} from "../navbar/navbar.module";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NavbarModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
}
