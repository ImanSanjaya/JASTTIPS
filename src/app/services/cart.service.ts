import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { JasttipsDataService } from "../api/jasttips-data.service";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private qty: any;

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute,
    private storage: Storage
  ) {}

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  reduceItem(item) {
    for (let [index, c] of this.cart.entries()) {
      if (c.id === item.id) {
        c.qty -= 1;
        if (c.qty == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  addItem(item) {
    let added = false;
    for (const c of this.cart) {
      if (c.id_item === item.id_item) {
        item.qty += 1;
        item.total = item.price_item * item.qty;
        added = true;
        break;
      }
    }

    if (!added) {
      item.qty = 1;
      item.total = item.price_item * item.qty;
      this.cart.push(item);
      // localStorage.setItem('pushItem', this.cart)
    }

    console.log(this.cart);

    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
}
