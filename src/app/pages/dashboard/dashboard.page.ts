import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../../api/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  dashboardData: any;

  constructor(public dashboardService: DashboardService) {}

  ngOnInit() {}

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
  };

  ionViewDidEnter() {
    this.dashboardService.getDashboard().subscribe((dashboard: any[]) => {
      this.dashboardData = dashboard;
    });
  }
}
