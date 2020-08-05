import { Component, OnInit } from '@angular/core';
import { ServiceJasttipsService } from 'src/app/api/service-jasttips.service';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.page.html',
  styleUrls: ['./delivery-order.page.scss'],
})
export class DeliveryOrderPage implements OnInit {
  constructor(private serviceJasttipsService: ServiceJasttipsService) {}

  ngOnInit() {}

  formDeliveryOrder = {
    name_customer: '',
    phone_customer: '',
    address_customer: '',
  };

  submitDeliveryOrder() {
    open(
      this.serviceJasttipsService.sendMessageForDeliveryOrder(
        '6287879571222',
        this.formDeliveryOrder
      )
    );
  }
}
