import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  hideFilters() {
    const filtersWindow = document.getElementById("filters-window");
    // @ts-ignore
    filtersWindow.style.display = "none";
  }


}
