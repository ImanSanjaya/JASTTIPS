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
  nameOutlet: any;
  listItem: any;

  menuSegment: string;

  private currentNumber = 0;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute
  ) {}

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
            if (idOutlet == this.detailProductId) {
              this.idOutlet = idOutlet;
              this.nameOutlet = nameOutlet;
            }
          }
        }
      });

    this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((rest) => {
        this.listItem = rest.item;
      });
  }

  // private decrement() {
  //   if (this.currentNumber < 1) {
  //     this.currentNumber = 0;
  //   } else {
  //     this.currentNumber--;
  //     this.subTotal = this.harga * this.currentNumber;
  //   }
  // }

  // private increment() {
  //   this.currentNumber++;
  //   this.subTotal = this.harga * this.currentNumber;
  // }

  
}
