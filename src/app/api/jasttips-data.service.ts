import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import Rupiah from "../lib/currency_rupiah/rupiah";

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

  public sendMessageForDeliveryOrder(username, noWaAdmin,no_telp_user, formDeliveryOrder, allOrder) {

    let CurrencyRupiah = new Rupiah(null);

    const enter = '%0A';
    const enter2x = '%0A%0A';
    const headerMsg = '*Pemesanan Item* ';
    const fontBold = '*';

    const txtUsername = '*Nama :* ';
    const txtNoTelpUser = '*No Telepon :* ';
    const txtAddress = '*Alamat :* ';
    const txtAdditionalMessage = '*Pesan Tambahan :* ';

    var MessageSend = '';
    var ItemOrders = '';

    var TotalOrder : number = 0 ;

    allOrder.map(data => {
      ItemOrders = ItemOrders+fontBold+data.name_outlet+fontBold+enter+
      'No Telp : '+data.phone_outlet+enter+
      'Nama Item : '+data.name_item+enter;

      if(data.price_item_promo == 0 || !data.price_item_promo == null){
        CurrencyRupiah = new Rupiah(Number(data.price_item));
        CurrencyRupiah.setPrefix = "Rp.";
        CurrencyRupiah.setSuffix = ",-";
        
        ItemOrders = ItemOrders+'Harga Normal :'+CurrencyRupiah.format+enter;
      }else{
        CurrencyRupiah = new Rupiah(Number(data.price_item_promo));
        CurrencyRupiah.setPrefix = "Rp.";
        CurrencyRupiah.setSuffix = ",-";

        ItemOrders = ItemOrders+'Harga Promo :'+CurrencyRupiah.format+enter;
      }

      CurrencyRupiah = new Rupiah(Number(data.sub_total));
      CurrencyRupiah.setPrefix = "Rp.";
      CurrencyRupiah.setSuffix = ",-";

      ItemOrders = ItemOrders+'Jumlah Item : '+data.qty+enter+
      fontBold+'Sub Total : '+CurrencyRupiah.format+fontBold+enter2x;

      

      TotalOrder = TotalOrder+Number(data.sub_total);
    })

    CurrencyRupiah = new Rupiah(Number(TotalOrder));
    CurrencyRupiah.setPrefix = "Rp.";
    CurrencyRupiah.setSuffix = ",-";
    
    ItemOrders = ItemOrders+fontBold+'TOTAL PEMESANAN : '+CurrencyRupiah.format+fontBold;

    console.log(JSON.stringify(ItemOrders));

    MessageSend = 
    //  --- Send -----------------------------------------------------
    environment.apiSendMessageWA + noWaAdmin + '&text=' +
    // ---------------------------------------------------------------

    // --- Header ----------------------------------------------------
    headerMsg + enter2x +
    txtUsername + username + enter +
    txtNoTelpUser + environment.apiSendMessageWA + no_telp_user + enter +
    txtAddress + formDeliveryOrder.address_customer + enter;

    if(formDeliveryOrder.additional_message == null || formDeliveryOrder.additional_message == ''){
      MessageSend = MessageSend+txtAdditionalMessage +'-'+ enter2x;
    }else{
      MessageSend = MessageSend+txtAdditionalMessage + formDeliveryOrder.additional_message + enter2x;
    }
    // ---------------------------------------------------------------

    // --- Order -----------------------------------------------------
    MessageSend = MessageSend+ItemOrders;  
    // ---------------------------------------------------------------
    
    return MessageSend;
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
