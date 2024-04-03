import { Component, HostListener } from '@angular/core';
import { GlobalService } from "./services/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  deferredPrompt: any;
  showInstallButton = false;

  constructor(public globalService: GlobalService) { }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: Event): void {
    e.preventDefault(); // Prevent the button from appearing on mobile
    this.deferredPrompt = e;
    this.showInstallButton = true;
  }

  installPWA(): void {
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
      this.showInstallButton = false;
    });
  }

}
