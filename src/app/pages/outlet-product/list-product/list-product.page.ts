import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { JasttipsDataService } from "../../../api/jasttips-data.service";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.page.html",
  styleUrls: ["./list-product.page.scss"],
})
export class ListProductPage implements OnInit {
  productId = this.route.snapshot.paramMap.get("productId");
  outletName: any;
  listProduct: any;

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
            const idProduct = listProduct.id_category_outlet;

            if (idProduct == idProduct) {
              this.jasttipsDataService
                .getListOutlet(idProduct)
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
            const idProduct = listProduct.id_category_outlet;

            if (idProduct == idProduct) {
              this.jasttipsDataService
                .getListOutlet(idProduct)
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
