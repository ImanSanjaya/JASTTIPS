import { Component, OnInit } from '@angular/core';
import { ServiceJasttipsService } from '../../api/service-jasttips.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  constructor(private serviceJasttipsService: ServiceJasttipsService) {}

  ngOnInit() {}

  formOrder = {
    name_customer: '',
    phone_customer: '',
    address_customer: '',
    product_customer: '',
    outlet_customer: '',
  };

  submitOrder() {
    open(
      this.serviceJasttipsService.sendMessageForOrder(
        '6287879571222',
        this.formOrder
      )
    );
  }
}
