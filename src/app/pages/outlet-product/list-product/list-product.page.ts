import { Component, OnInit } from '@angular/core';

import { ListProductService } from '../../../api/product/list-product/list-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {
  listProductID: any;
  listProduct: any;

  food = 1;

  constructor(
    private listProductService: ListProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDetailData();
    this.getListProduct();
  }

  getDetailData() {
    this.listProductService.dashboardData().subscribe((data: any) => {
      const productId = this.route.snapshot.paramMap.get('productId');
      if (data && data.dashboard) {
        for (const listProduct of data.dashboard) {
          if (listProduct && listProduct.id === productId) {
            this.listProductID = listProduct;

            if (listProduct.id == 1) {
              this.listProductService
                .productListData()
                .subscribe((data: any) => {
                  this.listProduct = data.foodOutlet;
                  console.log(this.listProduct);
                });
            } else if (listProduct.id == 3) {
              this.listProductService
                .productListData()
                .subscribe((data: any) => {
                  this.listProduct = data.printingOutlet;
                  console.log(this.listProduct);
                });
            }

            break;
          }
        }
      }
    });
  }

  getListProduct() {
    this.listProductService.productListData().subscribe((data: any) => {
      this.listProduct = data.printingOutlet;
      // console.log(this.listProduct);
    });
  }
}
