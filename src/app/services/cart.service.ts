import { Injectable } from "@angular/core";
import { JasttipsDataService } from "../api/jasttips-data.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: any[] = [];

  itemCart: any = {};
  itemInCart = [];

  cartItemCount: any = 0;

  constructor(
    private jasttipsService: JasttipsDataService
  ) {
    // this.cart = JSON.parse(localStorage.getItem('cart-items'));
  }

  addItem(item) {
    this.cart = JSON.parse(localStorage.getItem("cart-items"));
    this.itemInCart = [];

    if (this.cart == null) {
      this.itemCart = item;
      this.itemInCart.push(this.itemCart);
      localStorage.setItem("cart-items", JSON.stringify(this.itemInCart));
      localStorage.setItem("cartItemCount", (this.cartItemCount += 1));
    } else {
      for (let i = 0; i <= this.cart.length - 1; i++) {
        if (this.cart[i].id_item == item.id_item) {
          this.cart.splice(i, 1);
        }
      }

      this.itemCart = item;
      this.cart.push(this.itemCart);
      localStorage.setItem("cart-items", JSON.stringify(this.cart));
      localStorage.setItem("cartItemCount", (this.cartItemCount += 1));
    }
  }

  reduceItem(item) {
    this.cart = JSON.parse(localStorage.getItem("cart-items"));
    this.itemCart = item;

    for (let i = 0; i <= this.cart.length - 1; i++) {
      if (this.cart[i].id_item == this.itemCart.id_item) {
        this.cart.splice(i, 1);
      }
    }

    this.cart.push(this.itemCart);
    localStorage.setItem("cart-items", JSON.stringify(this.cart));
    localStorage.setItem("cartItemCount", String((this.cartItemCount -= 1)));

    if (this.itemCart.qty == 0) {
      for (let [index, key] of this.cart.entries()) {
        if (key.id_item == this.itemCart.id_item) {
          this.cart.splice(index, 1);
          localStorage.setItem("cart-items", JSON.stringify(this.cart));   
        }
      }
    }

  }

  // Masih Bugs
  removeProduct(item) {
    this.cart = JSON.parse(localStorage.getItem("cart-items"));
    this.itemCart = item;

    let getStorage = JSON.parse(localStorage.getItem('outlet-'+ this.itemCart.id_outlet))

    for (let i = 0; i <= this.cart.length - 1; i++) {
      if (this.cart[i].id_item == this.itemCart.id_item) {
        this.cart.splice(i, 1);
      }
    }

    this.cart.push(this.itemCart);
    localStorage.setItem("cart-items", JSON.stringify(this.cart));

    let getStorageCartItemCount = JSON.stringify(localStorage.getItem('cartItemCount'));
    let cartItemCountQty = JSON.parse(getStorageCartItemCount) - this.itemCart.qty;

    localStorage.setItem("cartItemCount", String(cartItemCountQty));

    for (let [index, key] of this.cart.entries()) {
      if (key.id_item == this.itemCart.id_item) {
        this.cart.splice(index, 1);
        localStorage.setItem("cart-items", JSON.stringify(this.cart));   
      }
    }

    this.jasttipsService
      .getListItem(this.itemCart.id_outlet)
      .subscribe((data) => {

        let items = data["item"].map((item) => {
          let itemsFilter = getStorage.filter(data => data.id_item === item.id_item);

          return {
            ...item,
            qty: 0,
            sub_total: 0,
          };
        });

        localStorage.setItem("outlet-" + this.itemCart.id_outlet, JSON.stringify(items));
      });

  }

}
