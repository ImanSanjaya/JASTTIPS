import { DetailProductPage } from './../detail-product/detail-product.page';
import { Component, OnInit } from "@angular/core";
import { JasttipsDataService } from "src/app/api/jasttips-data.service";

import { HttpClient } from "@angular/common/http";
import { UserData } from 'src/app/api/user-data';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: "app-delivery-order",
  templateUrl: "./delivery-order.page.html",
  styleUrls: ["./delivery-order.page.scss"],
})
export class DeliveryOrderPage implements OnInit {
  data: any;

  noWaAdmin: any;

  username: string;
  no_telp_user: string;
  
  nameOutlets: any;
  cartItems: any;

  totalItems: any;
  total: any;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private http: HttpClient,
    private userData: UserData,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getUsername();
    this.getNoTelpUser();
    this.getCartItem();
    this.getCartItem();
    this.total;
  }

  getCartItem() {
    this.cartItems = JSON.parse(localStorage.getItem('cart-items'));
    if (this.cartItems) {
      let subTotal = this.cartItems.map(data => data.sub_total)
      this.totalItems = subTotal.reduce((a,b)=>{return a + b},0)
    }
      
    this.total = this.totalItems > 0 ? this.totalItems : 0
  }

  removeItem(item) {
    this.cartService.removeProduct(item);

    setTimeout(() => {
      this.getCartItem();
      this.total;
    }, 0);
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  getNoTelpUser() {
    this.userData.getNoTelpUser().then((no_telp_user) => {
      this.no_telp_user = no_telp_user;
    });
  }

  formDeliveryOrder = {
    address_customer: "",
    additional_message: "",
  };

  submitDeliveryOrder() {

    this.jasttipsDataService.getNumberWhatsApp().subscribe(res => {
      res.number_whatsapp.map(data => {
        this.noWaAdmin = data.no_wa;
        localStorage.setItem('no_wa_admin', this.noWaAdmin);
      })
    });

    open(
      this.jasttipsDataService.sendMessageForDeliveryOrder(
        this.username,
        this.no_telp_user,
        this.formDeliveryOrder,
        this.cartItems
      )
    );
  }

}
