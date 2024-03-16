import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css'
})
export class SuggestionComponent {
  @Input() nom: string = '';

  selectSuggestion() {
    // Émettre un événement ou appeler une fonction pour indiquer que cette suggestion est sélectionnée
  }
}
