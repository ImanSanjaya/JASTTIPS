import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JasttipsDataService {

  order: any;

  nameOutlet: any;
  alamatOutlet: any;
  noTelpOutlet: any;
  qty: any;
  nameItem: any;
  priceItemPromo: any;
  priceItem: any;
  subTotal: any;

  constructor(private http: HttpClient) {}

  public getListCategory() {
    return this.http.get<any>(environment.apiJasttips + 'GetListCategory', {});
  }

  public getListOutlet(id: any) {
    return this.http.get<any>(environment.apiJasttips + 'GetListOutlet/' + id, {});
  }

  public getListItem(id: any) {
    return this.http.get<any>(environment.apiJasttips + 'GetListItem/' + id, {});
  }

  public getListItemPromo() {
    return this.http.get<any>(environment.apiJasttips + 'GetListItemPromo', {});
  }

  public sendMessageForDeliveryOrder(phone_admin: string, username, no_telp_user, formDeliveryOrder, detailOrder) {

    const enter = '%0A';
    const enter2x = '%0A%0A';
    
    const headerMsg = '*Untuk Pemesanan Item* ';
    const nama = '*Nama :* ';
    const noTelp = '*No* *Telepon* *:* ';
    const alamat = '*Alamat* *:* ';
    const pesanTambahan = '*Pesan* *Tambahan* *:* ';


    detailOrder.map(data => {
      this.order = data;
      this.nameOutlet = '*' + data.name_outlet + '*';
      this.qty = data.qty;
      this.nameItem = data.name_item;
      this.priceItemPromo = data.price_item_promo;
      this.priceItem = data.price_item;
      this.subTotal = data.sub_total;
    });
    
    
    const alamatOutlet = 'Alamat Outlet : Grand Taruma';
    const noTelpOutlet = 'No Telp : ';
    const qty = '2';
    const nameItem = 'Kopi Peka';
    const priceItem = '(Rp.100,000)';

    const subTotal = '*Sub Total : Rp.200,000*';

    const total = '*TOTAL PEMESANAN : Rp.200,000*'

    return (
      environment.apiSendMessageWA +
      phone_admin + '&text=' +
      headerMsg + enter2x +
      nama + username + enter +
      noTelp + environment.apiSendMessageWA + no_telp_user + enter +
      alamat + formDeliveryOrder.address_customer + enter +
      pesanTambahan + formDeliveryOrder.additional_message + enter2x +

      this.order.

      // this.nameOutlet + enter +
      // alamatOutlet + enter +
      // noTelpOutlet + environment.apiSendMessageWA + '6287879571222' + enter +
      // this.qty + ' ' + this.nameItem + ' ' + this.priceItemPromo +
      // + this.priceItem + enter + 
      // this.subTotal + enter2x + 

      // total
  }

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
}
