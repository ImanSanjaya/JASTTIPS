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
  listItem: any;

  qty: any;
  subTotal: any = 0;

  menuSegment: string;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menuSegment = "menuLengkap";
    this.getData();
    this.qty = 0;
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

  decrement(idItem) {
    if (this.qty < 1) {
      this.qty = 0;
    } else {
      this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((rest) => {
        for (const idListItem of rest.item) {
          const idPerQty = idListItem.id_item;
          const priceItem = idListItem.price_item;
          if (idItem == idPerQty) {
            this.qty--;
            const total = priceItem * 1;
            
            this.subTotal -= total;
            console.log(this.subTotal);
          }
          
        }
      });
    }
  }

  increment(idItem) {
    this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((rest) => {
        for (const idListItem of rest.item) {
          const idPerQty = idListItem.id_item;
          const priceItem = idListItem.price_item;
          if (idItem == idPerQty) {
            this.qty++;
            const total = priceItem * 1;
            this.subTotal += total;
          }
          
        }
      });
    
  }
}
