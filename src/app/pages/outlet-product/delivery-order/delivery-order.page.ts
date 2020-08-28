import { Component, OnInit } from "@angular/core";
import { JasttipsDataService } from "src/app/api/jasttips-data.service";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-delivery-order",
  templateUrl: "./delivery-order.page.html",
  styleUrls: ["./delivery-order.page.scss"],
})
export class DeliveryOrderPage implements OnInit {
  data: any;

  idOutlet: any;
  dataOutlet: any;

  idOutletItem: any;
  dataItem: any;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getOutlet();
  }

  formDeliveryOrder = {
    name_customer: "",
    phone_customer: "",
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
        "6287869667004",
        this.formDeliveryOrder
      )
    );
  }
}
