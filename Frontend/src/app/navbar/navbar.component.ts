import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  ngOnInit(): void {
    this.getDisplay("filters-window");
    this.getDisplay("menu");
  }

  getDisplay(id: string): string | null {
    const element = document.getElementById(id);

    if (element) {
      return getComputedStyle(element).display;
    }
    return null;
  }

  toggleStatus(status: number) {
    if (status === 0) {  // visitor
    }

    else if (status === 1) {  // user
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

    else if (status === 2) {  // admin
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
