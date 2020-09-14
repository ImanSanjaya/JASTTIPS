import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { JasttipsDataService } from "../api/jasttips-data.service";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class CartService {  

  cart: any[] = [];

  itemInCart = [];

  cartItemCount: any = 0;

  constructor() {}

  addItem(item) {
    let added = false;

    this.cart.map(data => {
      if (data.id_item === item.id_item) {
        added = true
      }
    })

    if (!added) {
      item.qty = 1
      this.cart.push(item)
    }
    
    localStorage.setItem('cart-items', JSON.stringify(this.cart))
    localStorage.setItem('cartItemCount', this.cartItemCount += 1)

  }

  reduceItem(item) {
    for (let [index, c] of this.cart.entries()) {
      if (c.id === item.id) {
        if (c.qty == 0) {
          this.cart.splice(index, 1);
        }
      }
    }

    localStorage.setItem('cart-items', JSON.stringify(this.cart))
    let cartItemCount = String(this.cartItemCount -= 1)
    localStorage.setItem('cartItemCount', cartItemCount)
  }
}
