import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { JasttipsDataService } from "../../../api/jasttips-data.service";
import { BehaviorSubject, Observable } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { Storage } from "@ionic/storage";

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

  outlets: any[] = [];
  items: any = [];

  carts = [];
  cartItemCount: BehaviorSubject<number>;

  qty: any;
  total: any;
  subTotal: any;

  menuSegment: string;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.menuSegment = "menuLengkap";
    this.getDataOutlet();
    this.getDataItems();
    this.cartItemCount = this.cartService.getCartItemCount();

    return this.storage.get('qty').then((value) => {
      console.log(value);
      
      return value;
    });
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      this.getDataOutlet();
      this.getDataItems();
      event.target.complete();
    }, 2000);
  }

  getDataOutlet() {
    this.jasttipsDataService
      .getListOutlet(this.productId)
      .subscribe((outlets) => {
        this.outlets = outlets["outlet"].map((outlet) => {
          return {
            ...outlet,
            sub_total: 0,
          };
        });

        for (const outlet of this.outlets) {
          if (outlet.id_outlet == this.detailProductId) {
            this.idOutlet = outlet.id_outlet;
            this.nameOutlet = outlet.name_outlet;
            this.imgOutlet = outlet.img_path_outlet;
            this.subTotal = outlet.sub_total;
          }
        }
      });
  }

  getDataItems() {
    this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((items) => {
        this.items = items["item"].map((item) => {
          return {
            ...item,
            qty: 0,
            total: 0,
          };
        });
      });
  }

  decrement(item) {
    if (item.qty < 1) {
      item.qty = 0;
    } else {
      item.total = item.price_item * 1;
      this.subTotal -= item.total;
      this.cartService.reduceItem(item);
    }
  }

  increment(item) {
    item.total = item.price_item * 1;
    this.subTotal += item.total;
    this.storage.set('qty', item.qty);
    this.cartService.addItem(item);
  }
}
