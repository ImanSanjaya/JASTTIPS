import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../api/dashboard/dashboard.service';
import { ListProductService } from '../../api/product/list-product/list-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  dashboardData: any;
  listProduct: any;

  constructor(
    public dashboardService: DashboardService,
    public listProductService: ListProductService
  ) {}

  ngOnInit() {
    this.getListProduct();
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 300
  };

  ionViewDidEnter() {
    this.dashboardService.getDashboard().subscribe((dashboard: any[]) => {
      this.dashboardData = dashboard;
    });
  }

  getListProduct() {
    this.listProductService.productListData().subscribe((data: any) => {
      this.listProduct = data.foodOutlet;

      console.log(this.listProduct);
      
    });
  }
}
