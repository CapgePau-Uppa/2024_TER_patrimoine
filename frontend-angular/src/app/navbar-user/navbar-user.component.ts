import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent {
  toggleSearchBar() {
    let searchBar = document.getElementById("searchBar");
    // @ts-ignore
    searchBar.style.display = searchBar.style.display !== "none" ? "none" : "flex";
  }
}
