import { AfterViewInit, Component } from '@angular/core';
//import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userRole: string = 'visitor';
}
