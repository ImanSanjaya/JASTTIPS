import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

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
  detailProductId = this.route.snapshot.paramMap.get("detailProductId");

  nameOutlet: any;
  imgOutlet: any;

  idItem: any;

  items: any = [];

  carts: any = [];
  cartsTmp = [];
  cartItemCount: BehaviorSubject<number>;

  qty: any;
  getQty: any;
  getQtys: any;
  subTotal: any;

  saveItems: any[] = [];

  menuSegment: string;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.menuSegment = "menuLengkap";
    this.loadData();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      this.loadData();
      event.target.complete();
    }, 2000);
  }

  loadData() {
    this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((items) => {
        this.items = items["item"].map((item) => {
          return {
            ...item,
            qty: 0,
            total: 0,
            subtotal: 0,
          };
        });

        for (let item of this.items) {
          this.nameOutlet = item["name_outlet"];
          this.imgOutlet = item["img_path_outlet"];
          this.subTotal = item["subtotal"];
        }
      });
  }

  increment(item) {
    this.cartService.addItem(item);
    this.subTotal = item.total
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

  setCart() {
    // console.log(this.cartService.getCart());

    this.router.navigateByUrl("/delivery-order");
  }
}
