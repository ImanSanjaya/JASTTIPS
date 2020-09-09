import { Component, OnInit } from "@angular/core";
import { JasttipsDataService } from "src/app/api/jasttips-data.service";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { UserData } from 'src/app/api/user-data';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: "app-delivery-order",
  templateUrl: "./delivery-order.page.html",
  styleUrls: ["./delivery-order.page.scss"],
})
export class DeliveryOrderPage implements OnInit {
  data: any;

  username: string;
  no_telp_user: string;

  idOutlet: any;
  dataOutlet: any;

  idOutletItem: any;
  dataItem: any;

  nameOutlet: any;
  carts = [];

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private http: HttpClient,
    private userData: UserData,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getUsername();
    this.getNoTelpUser();
    this.carts = this.cartService.getCart()
    
    console.log(this.carts)
    
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
    open(
      this.jasttipsDataService.sendMessageForDeliveryOrder(
        // "6287869667004",
        "6287879571222",
        this.username,
        this.no_telp_user,
        this.formDeliveryOrder
      )
    );
  }
}
