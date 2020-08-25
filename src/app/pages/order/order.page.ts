import { Component, OnInit } from '@angular/core';
import { JasttipsDataService } from '../../api/jasttips-data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  constructor(private jasttipsDataService: JasttipsDataService) {}

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
      this.jasttipsDataService.sendMessageForOrder(
        '6287879571222',
        this.formOrder
      )
    );
  }
}
