import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CheckSignupService implements CanLoad {

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  canLoad() {
    return this.storage.get('ready_sign_up').then(res => {
      if (res) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    });
  }

}
