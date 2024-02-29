import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

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
    // @ts-ignore
    if (filtersWindow.style.display === "none") {
      // @ts-ignore
      filtersWindow.style.display = "block";
    } else {
      // @ts-ignore
      filtersWindow.style.display = "none";
    }
  }
}
