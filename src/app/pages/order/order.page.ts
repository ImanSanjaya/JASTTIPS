import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { JasttipsDataService } from "../../api/jasttips-data.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.page.html",
  styleUrls: ["./order.page.scss"],
})
export class OrderPage implements OnInit {
  category: any;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      if (rest && rest.category) {
        for (const listProduct of rest.category) {
          if (listProduct && listProduct.id_category_outlet == 2) {
            const idProduct = listProduct.id_category_outlet;
            if (idProduct == idProduct) {
              this.jasttipsDataService
                .getListOutlet(3)
                .subscribe((rest: any) => {
                  this.category = listProduct.name_category_outlet;
                });
            }
          }
        }
      }
    });
  }

  formOrder = {
    name_customer: "",
    phone_customer: "",
    address_customer: "",
    product_customer: "",
    outlet_customer: "",
  };

  submitOrder() {
    open(
      this.jasttipsDataService.sendMessageForOrder(
        "6287879571222",
        this.formOrder
      )
    );
  }
}
