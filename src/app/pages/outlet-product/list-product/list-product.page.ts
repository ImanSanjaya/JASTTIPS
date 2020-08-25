import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JasttipsDataService } from '../../../api/jasttips-data.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {
  listProductID: any;
  listProduct: any;

  outletName: any;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      const productId = this.route.snapshot.paramMap.get('productId');

      if (rest && rest.category) {
        for (const listProduct of rest.category) {
          if (listProduct && listProduct.id_category_outlet === productId) {
            this.listProductID = listProduct;

            if (listProduct.id_category_outlet == 1) {
              this.jasttipsDataService
                .getListFoodOutlet()
                .subscribe((rest: any) => {
                  this.outletName = 'Makanan';
                  this.listProduct = rest.outlet;
                });
            } else if (listProduct.id_category_outlet == 2) {
              this.outletName = 'Percetakan';
            }
          }
        }
      }
    });
  }
}
  