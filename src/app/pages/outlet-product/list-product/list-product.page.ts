import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { JasttipsDataService } from "../../../api/jasttips-data.service";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.page.html",
  styleUrls: ["./list-product.page.scss"],
})
export class ListProductPage implements OnInit {
  listProductID: any;
  listProduct: any;
  outletName: any;
  productId = this.route.snapshot.paramMap.get("productId");

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      if (rest && rest.category) {
        for (const listProduct of rest.category) {
          if (listProduct && listProduct.id_category_outlet === this.productId) {
            this.listProductID = listProduct;

            if (listProduct.id_category_outlet == 1) {
              this.jasttipsDataService
                .getListOutlet(1)
                .subscribe((rest: any) => {
                  this.outletName = listProduct.name_category_outlet;
                  this.listProduct = rest.outlet;
                });
            } else if (listProduct.id_category_outlet == 2) {
              this.jasttipsDataService
                .getListOutlet(2)
                .subscribe((rest: any) => {
                  this.outletName = listProduct.name_category_outlet;
                  this.listProduct = rest.outlet;
                });
            }
          }
        }
      }
    });
  }

  filterData(ev: any) {
    const val = ev.target.value;
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      if (rest && rest.category) {
        for (const listProduct of rest.category) {
          if (listProduct && listProduct.id_category_outlet === this.productId) {
            this.listProductID = listProduct;
            
            if (listProduct.id_category_outlet == 1) {
              this.jasttipsDataService
                .getListOutlet(1)
                .subscribe((rest: any) => {
                  this.outletName = listProduct.name_category_outlet;
                  this.listProduct = rest.outlet;

                  if (val && val.trim() != "") {
                    this.listProduct = this.listProduct.filter((item) => {
                      return (
                        item.name_outlet
                          .toLowerCase()
                          .indexOf(val.toLowerCase()) > -1
                      );
                    });
                  }
                });
            } else if (listProduct.id_category_outlet == 2) {
              this.jasttipsDataService
                .getListOutlet(2)
                .subscribe((rest: any) => {
                  this.outletName = listProduct.name_category_outlet;
                  this.listProduct = rest.outlet;

                  if (val && val.trim() != "") {
                    this.listProduct = this.listProduct.filter((item) => {
                      return (
                        item.name_outlet
                          .toLowerCase()
                          .indexOf(val.toLowerCase()) > -1
                      );
                    });
                  }
                });
            }
          }
        }
      }
    });
  }
}
