import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JasttipsDataService {
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

    const headerMsg = '*Untuk Pemesanan Item* ';
    const nama = '*Nama :* ';
    const noTelp = '*No* *Telepon* *:* ';
    const alamat = '*Alamat* *:* ';
    const pesanTambahan = '*Pesan* *Tambahan* *:* ';

    const varCategory = '*( Makanan )*';

    const nameOutlet = '*Kopi Kenangan*';
    const alamatOutlet = 'Alamat Outlet : Grand Taruma';
    const noTelpOutlet = 'No Telp : ';
    const qty = '2';
    const nameItem = 'Kopi Peka';
    const priceItem = '(Rp.100,000)';

    const subTotal = '*Sub Total : Rp.200,000*';

    const total = '*TOTAL PEMESANAN : Rp.200,000*';


    const enter = '%0A';
    const enter2x = '%0A%0A';

    return (
      environment.apiSendMessageWA +
      phone_admin + '&text=' +
      headerMsg + enter2x +
      nama + formDeliveriOrder.name_customer + enter +
      noTelp + environment.apiSendMessageWA + formDeliveriOrder.phone_customer + enter +
      alamat + formDeliveriOrder.address_customer + enter +
      pesanTambahan + formDeliveriOrder.additional_message + enter2x +
      varCategory + enter2x + 
      nameOutlet + enter +
      alamatOutlet + enter +
      noTelpOutlet + environment.apiSendMessageWA + '6287879571222' + enter +
      qty + ' ' + nameItem + ' ' + priceItem + enter + 
      subTotal + enter2x + 
      total
    );
  }

  public getListCategory() {
    return this.http.get<any>(environment.apiJasttips + 'GetListCategory', {});
  }

  public getListOutlet(id: any) {
    return this.http.get<any>(environment.apiJasttips + 'GetListOutlet/' + id, {});
  }

  public getListItem(detail: string) {
    return this.http.get<any>(environment.apiJasttips + 'GetListItem/' + detail, {});
  }
}
