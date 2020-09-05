import { Component, OnInit } from '@angular/core';
import { JasttipsDataService } from '../../api/jasttips-data.service';
import { UserData } from 'src/app/api/user-data';
import { ModalController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  username: string;
  no_telp_user: string;

  listCategory: any;

  idOutlet: any;
  itemPromo: any;

  connection: boolean = true;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private modalCtrl: ModalController,
    private userData: UserData,
    private router: Router
    ) {}

  ngOnInit() {
    this.getData();
    this.getItemListPromo();
    setInterval(() => {
      this.getUsername();
      this.getNoTelpUser();
    }, 1000)
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 300,
  };

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getData();
      this.getItemListPromo();
      event.target.complete();
    }, 2000);
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  getNoTelpUser() {
    this.userData.getNoTelpUser().then((no_telp_user) => {
      this.no_telp_user = no_telp_user;
    });
  }

  async account() {
    let modal = await this.modalCtrl.create({
      component: AccountPage,
      cssClass: 'account-modal'
    });
    modal.present();
  }

  getData() {
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      this.listCategory = rest.category;
      this.connection = true;
    }, err => {
      this.connection = false;
      console.log(this.connection);
    });
  }

  getItemListPromo() {
    this.jasttipsDataService
      .getListItemPromo()
      .subscribe((itemPromo) => {
        this.itemPromo = itemPromo["item_promo"].map((item) => {
          return {
            ...item,
            qty: 0,
            total: 0,
            subtotal: 0
          };
        });
      });
  }

  selectPromo(promo) {
    this.router.navigate(['/promo-product', {
      data: JSON.stringify(promo)
    }])
  }

}
