import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage
  ) { }

  signup(username: string, no_telp_user: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      this.setNoTelpUser(no_telp_user);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  setNoTelpUser(no_telp_user: string): Promise<any> {
    return this.storage.set('no_telp_user', no_telp_user);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  getNoTelpUser(): Promise<string> {
    return this.storage.get('no_telp_user').then((value) => {
      return value;
    });
  }
}