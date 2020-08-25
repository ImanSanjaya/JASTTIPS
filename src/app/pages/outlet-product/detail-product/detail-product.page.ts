import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { JasttipsDataService } from "../../../api/jasttips-data.service";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.page.html",
  styleUrls: ["./detail-product.page.scss"],
})
export class DetailProductPage implements OnInit {
  menuSegment: string;

  listItem: any;
  private currentNumber = 0;

  outletName: any;
  listProduct;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menuSegment = "menuLengkap";
    this.getData();
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

  getData() {
    const detailProductId = this.route.snapshot.paramMap.get("detailProductId");

    this.jasttipsDataService
      .getListItem(detailProductId)
      .subscribe((rest) => {
        this.listItem = rest.item;
      });
    
      console.log();
    }
}
