import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  //isActive: boolean = false;
  /*building: Building;

  constructor(private buildingService: BuildingService, private sideWindowService: SideWindowService) { }

  ngOnInit(): void {
    // Subscribe to building details changes
    this.sideWindowService.buildingDetails.subscribe((building: Building) => {
      this.building = building;
      this.isActive = !!building; // Show the side panel if building details are provided
    });
  }

  close(): void {
    this.isActive = false;
  }*/

}
