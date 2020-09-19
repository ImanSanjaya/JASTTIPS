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

  itemCart: any = {};
  itemInCart = [];

  cartItemCount: any = 0;

  constructor() {
    // this.cart = JSON.parse(localStorage.getItem('cart-items'));
  }

  addItem(item) {
    this.cart = JSON.parse(localStorage.getItem('cart-items'));
    this.itemInCart = [];

    if (this.cart == null) {
      this.itemCart = item;
      this.itemInCart.push(this.itemCart)
      localStorage.setItem('cart-items', JSON.stringify(this.itemInCart))
      localStorage.setItem('cartItemCount', this.cartItemCount += 1)
    } else {
      for (let i = 0; i <= this.cart.length - 1; i++) {
        if (this.cart[i].id_item == item.id_item) {
          this.cart.splice(i, 1)
        }
      }
      
      this.itemCart = item;
      this.cart.push(this.itemCart)
      localStorage.setItem('cart-items', JSON.stringify(this.cart))
      localStorage.setItem('cartItemCount', this.cartItemCount += 1)

    }
  }

  reduceItem(item) {
    this.cart = JSON.parse(localStorage.getItem('cart-items'));
    this.itemInCart = [];

    // if (this.cart == null) {
    //   this.itemCart = item;
    //   this.itemInCart.push(this.itemCart)
    //   localStorage.setItem('cart-items', JSON.stringify(this.itemInCart))

    //   let cartItemCount = String(this.cartItemCount -= 1)
    //   localStorage.setItem('cartItemCount', cartItemCount)

    //   console.log('reduce null');
      
    // } else {
    //   for (let i = 0; i <= this.cart.length - 1; i++) {
    //     if (this.cart[i].id_item == item.id_item) {
    //       this.cart.splice(i, 1)
    //     }
    //   }
      
    //   this.itemCart = item;
    //   this.cart.push(this.itemCart)
    //   localStorage.setItem('cart-items', JSON.stringify(this.cart))
      
    //   let cartItemCount = String(this.cartItemCount -= 1)
    //   localStorage.setItem('cartItemCount', cartItemCount)
    // }

    for (let i = 0; i <= this.cart.length - 1; i++) {
      if (this.cart[i].id_item == item.id_item) {
        this.cart.splice(i, 1);

        if (this.cart.length == 0) {
          console.log('this.cart.length == 0');
        }

      }
    }
    
    this.itemCart = item;
    this.cart.push(this.itemCart)
    localStorage.setItem('cart-items', JSON.stringify(this.cart))
    
    let cartItemCount = String(this.cartItemCount -= 1)
    localStorage.setItem('cartItemCount', cartItemCount)
    
  }

  removeProduct(item) {

    for (let i = 0; i <= this.cart.length - 1; i++) {
      if (this.cart[i].id_item == item.id_item) {
        this.cart.splice(i, 1);
        if (this.cart.length == 0) {
          localStorage.setItem("cart-items", JSON.stringify(this.cart));
        } else {
          localStorage.setItem("cart-items", JSON.stringify(this.cart));
        }
      }
    }
    
  }
}
