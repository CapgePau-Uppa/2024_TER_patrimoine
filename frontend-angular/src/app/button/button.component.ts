import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: '<button [ngClass]="buttonClass">{{ text }}</button>',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string | undefined;
  @Input() buttonClass: string | undefined;
}
