import { Component, HostListener, NgZone } from '@angular/core';
import { NgIf } from "@angular/common";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showInstallButton: boolean = true;
  private deferredPrompt: any;

  constructor(private zone: NgZone) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: Event) {
    e.preventDefault();
    this.deferredPrompt = e;
  }

  async installPWA() {
    console.log("Installation de l'application"); 

    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log("L'utilisateur à accepté l'installation de l'application");
      } else {
        console.log("L'utilisateur à refusé l'installation de l'application");
      }
      this.deferredPrompt = null;
      this.showInstallButton = false;
    }
  }
}
