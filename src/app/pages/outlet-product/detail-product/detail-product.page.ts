import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { JasttipsDataService } from "../../../api/jasttips-data.service";
import { BehaviorSubject } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { NavController } from '@ionic/angular';

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
  items: any[] = [];

  cart = [];
  cartItemCount: BehaviorSubject<number>;

  total: any;
  subTotal: any;

  menuSegment: string;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.menuSegment = "menuLengkap";
    this.getDataOutlet();
    this.getDataItems();
    this.cart = this.cartService.getChart();
    this.cartItemCount = this.cartService.getCartItemCount();
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
            total: 0
          };
        });
      });
  }


  // Masih Bag
  decrement(item) {
    if ((item.qty < 1)) {
      item.qty = 0;
    } else {
      item.qty = item.qty - 1;
      this.total = item.price_item * 1;
      this.subTotal -= this.total;
      localStorage.setItem("subTotal", this.subTotal);
      this.cartItemCount.next(this.cartItemCount.value - 1)
    }
  }

  increment(item) {
    item.qty += 1;
    item.total = item.price_item * 1;
    console.log(item.qty);
    
    this.subTotal += item.total;
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  // End Masih Bag
}
