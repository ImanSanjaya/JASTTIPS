import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class ServiceJasttipsService {
  constructor(private http: HttpClient) {}

  public sendMessageForOrder(phone_admin: string, formOrder) {
    return (
      environment.apiSendMessageWA +
      '/send?phone=' +
      phone_admin +
      '&text=' +
      '*Nama%20:*%20' +
      formOrder.name_customer +
      '%0A%0A' +
      '*Nomor*%20*Telepon*%20*:*%20' +
      formOrder.phone_customer +
      '%0A%0A' +
      '*Alamat*%20*:*%20' +
      formOrder.address_customer +
      '%0A%0A' +
      '*Menu*%20*/*%20*Barang*%20*:*%20' +
      formOrder.product_customer +
      '%0A%0A' +
      '*Outlet*%20*:*%20' +
      formOrder.outlet_customer
    );
  }

  public sendMessageForDeliveryOrder(phone_admin: string, formDeliveriOrder) {
    return (
      environment.apiSendMessageWA +
      '/send?phone=' +
      phone_admin +
      '&text=' +
      '*Nama%20:*%20' +
      formDeliveriOrder.name_customer +
      '%0A%0A' +
      '*Nomor*%20*Telepon*%20*:*%20' +
      formDeliveriOrder.phone_customer +
      '%0A%0A' +
      '*Alamat*%20*:*%20' +
      formDeliveriOrder.address_customer
    );
  }
}
