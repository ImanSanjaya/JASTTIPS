import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: any[] = [];

  items: any;
  itemCart: any = {};
  itemInCart = [];

  cartItemCount: any;

  constructor() {}

  addItem(item) {
    this.cart = JSON.parse(localStorage.getItem("cart-items"));
    this.itemInCart = [];

    if (this.cart == null) {
      this.cartItemCount = 0;
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

  removeProduct(item) {
    this.cart = JSON.parse(localStorage.getItem("cart-items"));
    this.cartItemCount = 0;
    this.itemCart = item;

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

    let getStorage = JSON.parse(localStorage.getItem('outlet-'+ this.itemCart.id_outlet));

    this.items = getStorage;

    this.items.map(data => {
      if (data.id_item === this.itemCart.id_item) {
        data.qty = 0;
        data.sub_total = 0;
      }
    })
    
    localStorage.setItem('outlet-' + this.itemCart.id_outlet, JSON.stringify(this.items));
  }

}
