import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters-window',
  templateUrl: './filters-window.component.html',
  styleUrls: ['./filters-window.component.css']
})
export class FiltersWindowComponent {
  @Output() filtersSelected = new EventEmitter<any>();

  /*emitFilters() {
    const selectedFilters = { /!* Selected filters *!/ };
    this.filtersSelected.emit(selectedFilters);
  }*/
}
