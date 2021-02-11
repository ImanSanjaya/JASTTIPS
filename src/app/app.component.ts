import { Component, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  showSplash = true;
  backButtonSubcription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.statusBar.backgroundColorByHexString('#008b00');
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.backButtonEvent();
      timer(4000).subscribe(() => (this.showSplash = false));
    });
  }

  backButtonEvent() {
    this.backButtonSubcription = this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/dashboard') {
          this.presentAlertConfirm();
        }
      })
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Peringatan!',
      message: 'Yakin mau keluar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log("Cancel");
          }
        },
        {
          text: 'Keluar',
          handler: () => {
            console.log("Confirm");
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.backButtonSubcription.unsubcribe();
  }
}
