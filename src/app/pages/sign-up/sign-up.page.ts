import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  username: string;
  no_telp_user: string;

  constructor(public router: Router) {}

  ngOnInit() {}

  onSignUp() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('no_telp_user', '+62' + this.no_telp_user);
    this.router.navigateByUrl('/dashboard');
  }
}
