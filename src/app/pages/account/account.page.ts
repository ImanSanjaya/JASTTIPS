import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { UserData } from 'src/app/api/user-data';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {

  username: string;
  no_telp_user: string;

  interval: any;

  constructor(
    private modalCtrl: ModalController,
    private userData: UserData,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getUsername();
    this.getNoTelpUser();
    
    this.getDataUser();
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }

  close() {
    this.modalCtrl.dismiss();
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

  getDataUser() {
    this.interval = setInterval(() => {
      this.getUsername();
      this.getNoTelpUser();
    }, 1000);
  }

  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Ganti Nama',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  async changeNoWa() {
    const alert = await this.alertCtrl.create({
      header: 'Ganti Nomer WhatsApp',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setNoTelpUser(data.no_telp_user);
            this.getNoTelpUser();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'no_telp_user',
          value: this.no_telp_user,
          placeholder: 'No WhatsApp'
        }
      ]
    });
    await alert.present();
  }

}
