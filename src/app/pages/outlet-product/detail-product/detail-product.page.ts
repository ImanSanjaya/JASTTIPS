import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { JasttipsDataService } from "../../../api/jasttips-data.service";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.page.html",
  styleUrls: ["./detail-product.page.scss"],
})
export class DetailProductPage implements OnInit {
  productId = this.route.snapshot.paramMap.get("productId");
  detailProductId = this.route.snapshot.paramMap.get("detailProductId");

  idOutlet: any;
  idItem: any;

  nameOutlet: any;
  imgOutlet: any;

  items: any[] = [];

  total: any;
  subTotal: any = 0;

  menuSegment: string;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuSegment = "menuLengkap";
    this.getData();
  }

  getData() {
    this.jasttipsDataService
      .getListOutlet(this.productId)
      .subscribe((rest: any) => {
        if (rest && rest.outlet) {
          for (const listProduct of rest.outlet) {
            const idOutlet = listProduct.id_outlet;
            const nameOutlet = listProduct.name_outlet;
            const imgOutlet = listProduct.img_path_outlet;
            if (idOutlet == this.detailProductId) {
              this.idOutlet = idOutlet;
              this.nameOutlet = nameOutlet;
              this.imgOutlet = imgOutlet;
            }
          }
        }
      });

    this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((items) => {
        this.items = items["item"].map((item) => {
          return {
            ...item,
            qty: 0,
          };
        });
      });
  }

  decrement(item) {
    if ((item.qty < 1)) {
      item.qty = 0;
    } else {
      item.qty = item.qty - 1;
      this.total = item.price_item * 1;
      this.subTotal -= this.total;
    }
  }

  increment(item) {
    item.qty = item.qty + 1;
    this.total = item.price_item * 1;
    this.subTotal += this.total;
  }
}
