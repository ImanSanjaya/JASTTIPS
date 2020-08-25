import { Component, OnInit } from '@angular/core';
import { JasttipsDataService } from 'src/app/api/jasttips-data.service';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.page.html',
  styleUrls: ['./delivery-order.page.scss'],
})
export class DeliveryOrderPage implements OnInit {
  constructor(private jasttipsDataService: JasttipsDataService) {}

  ngOnInit() {}

  formDeliveryOrder = {
    name_customer: '',
    phone_customer: '',
    address_customer: '',
  };

  submitDeliveryOrder() {
    open(
      this.jasttipsDataService.sendMessageForDeliveryOrder(
        '6287879571222',
        this.formDeliveryOrder
      )
    );
  }
}
