import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };

  outletMakanan() {
    this.router.navigateByUrl('/list-product');
  }

  pesanBarang() {
    this.router.navigateByUrl('/order');
  }

  outletPercetakan() {
    this.router.navigateByUrl('/list-product');
  }
}
