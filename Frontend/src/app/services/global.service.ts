import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  globalVariable= 0;

  constructor() {
    console.log('GlobalVariable : ' + this.globalVariable);
  }
}
