import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserOptions } from '../../interfaces/user-options';
import { UserData } from '../../api/user-data';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  signup: UserOptions = {
    username: "",
    no_telp_user: ""
  };

  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public menu: MenuController,
    public storage: Storage
    ) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username, '62' + this.signup.no_telp_user);
      this.router.navigateByUrl('/dashboard', { replaceUrl: true })
      .then(() => this.storage.set('ready_sign_up', true));
    }
  }

  ionViewWillEnter() {
    this.storage.get('ready_sign_up').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      }
    });

    this.menu.enable(false)
  }

  ionViewDidLeave() {
    this.menu.enable(true);
  }
}
