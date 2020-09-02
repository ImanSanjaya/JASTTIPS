import { Component, OnInit } from "@angular/core";
import { JasttipsDataService } from "src/app/api/jasttips-data.service";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { UserData } from 'src/app/api/user-data';

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

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private http: HttpClient,
    private userData: UserData,
  ) {}

  ngOnInit() {
    this.getOutlet();
    this.getUsername();
    this.getNoTelpUser();
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
    name_customer: this.username,
    phone_customer: this.no_telp_user,
    address_customer: "",
    additional_message: "",
  };

  load(): any {
    return this.http.get("assets/data/keranjang.json");
  }

  getDataOutlet() {
    return this.load().pipe(
      map((data: any) => {
        return data.outlet;
      })
    );
  }

  getOutlet() {
    this.getDataOutlet().subscribe((outlet: any) => {
      this.dataOutlet = outlet;
    });
  }

  submitDeliveryOrder() {
    open(
      this.jasttipsDataService.sendMessageForDeliveryOrder(
        // "6287869667004",
        "6287879571222",
        this.formDeliveryOrder
      )
    );
  }
}
