import { Component, Input } from '@angular/core';
import { Building } from "../../building.model";

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css'
})
export class SuggestionComponent {
  @Input() batName: string | undefined;
}
