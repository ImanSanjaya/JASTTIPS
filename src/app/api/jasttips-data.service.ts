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

  noWaAdmin: any;

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

  public getNumberWhatsApp() {
    return this.http.get<any>(environment.apiJasttips + 'GetNumberWhatsApp', {});
  }

  public textBold(text) {
    text = '*' + text + '*';
    return text;
  }

  public sendMessageForDeliveryOrder(username, no_telp_user, formDeliveryOrder, detailOrder) {

    const enter = '%0A';
    const enter2x = '%0A%0A';
    const headerMsg = '*Pemesanan Item* ';

    const nama = '*Nama :* ';
    const noTelp = '*No* *Telepon* *:* ';
    const alamat = '*Alamat* *:* ';
    const pesanTambahan = '*Pesan* *Tambahan* *:* ';
    let getNoWaAdmin = localStorage.getItem('no_wa_admin');
    
    return (
      //  --- Send -----------------------------------------------------
      environment.apiSendMessageWA + getNoWaAdmin + '&text=' +
      // --------------------------------------------------------------

      // --- Isi Text -------------------------------------------------
      headerMsg + enter2x +
      nama + username + enter +
      noTelp + environment.apiSendMessageWA + no_telp_user + enter +
      alamat + formDeliveryOrder.address_customer + enter +
      pesanTambahan + formDeliveryOrder.additional_message + enter2x
      // --------------------------------------------------------------

    )
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
