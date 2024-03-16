import { Component } from '@angular/core';
import { GlobalService } from "../../services/global.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
    this.getDisplay("filters-window");
    this.getDisplay("menu");
    this.toggleStatut(this.globalService.globalVariable)
  }

  getDisplay(id: string): string | null {
    const element = document.getElementById(id);

    if (element) {
      return getComputedStyle(element).display;
    }
    return null;
  }

  toggleStatut(statut: number) {
    if (statut === 0) {  // visitor
    }

    else if (statut === 1) {  // user
      const searchBar = document.getElementById("searchBar");
      // @ts-ignore
      searchBar.style.display = "flex";

      const optAccount = document.getElementById("opt-account");
      // @ts-ignore
      optAccount.style.display = "flex";

      const btnConnect = document.getElementById("btn-connect");
      // @ts-ignore
      btnConnect.style.display = "none";

      const btnBat = document.getElementById("btn-add-bat");
      // @ts-ignore
      btnBat.style.display = "block";
    }

    else if (statut === 2) {  // admin
      const optSuggest = document.getElementById("opt-suggest");
      // @ts-ignore
      optSuggest.style.display = "flex";

      const optAccount = document.getElementById("opt-account");
      // @ts-ignore
      optAccount.style.display = "flex";

      const btnConnect = document.getElementById("btn-connect");
      // @ts-ignore
      btnConnect.style.display = "none";
    }
  }

  toggleFilters() {
    const filtersWindow = document.getElementById("filters-window");
    const filtersDisplay = this.getDisplay("filters-window");

    // @ts-ignore
    if (filtersDisplay === "none") {
      // @ts-ignore
      filtersWindow.style.display = "block";
    } else {
      // @ts-ignore
      filtersWindow.style.display = "none";
    }
  }

  toggleMenu() {
    const menu = document.getElementById("menu");
    const menuDisplay = this.getDisplay("menu");

    // @ts-ignore
    if (menuDisplay === "none") {
      // @ts-ignore
      menu.style.display = "flex";
    } else {
      // @ts-ignore
      menu.style.display = "none";
    }
  }
}
