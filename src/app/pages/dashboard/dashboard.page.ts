import { Component, OnInit } from "@angular/core";
import { JasttipsDataService } from "../../api/jasttips-data.service";
import { UserData } from "src/app/api/user-data";
import { ModalController } from "@ionic/angular";
import { AccountPage } from "../account/account.page";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  username: string;
  no_telp_user: string;

  categories: any;

  promoItems: any;

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
    }, 1000);
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 5,
    autoHeight: true,
    autoplay: true,
    speed: 1000,
  };

  doRefresh(event) {
    setTimeout(() => {
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
      cssClass: "account-modal",
    });
    modal.present();
  }

  getData() {
    this.jasttipsDataService.getListCategory().subscribe(
      (data) => {
        this.categories = data.category;
        this.connection = true;
      },
      (err) => {
        this.connection = false;
        console.log(this.connection);
      }
    );
  }

  getItemListPromo() {
    this.jasttipsDataService.getListItemPromo().subscribe((data) => {
      this.promoItems = data["item_promo"].map((data) => {
        return {
          ...data
        };
      });
    });
  }

  selectPromoItem(item) {
    this.jasttipsDataService
      .getListItem(item.id_outlet)
      .subscribe((rest) => {
        let items = rest["item"].map((data) => {
          return {
            ...data,
            qty: 0,
            sub_total: 0,
          };
        });

        if (localStorage.getItem("outlet-" + item.id_outlet)) {

        } else {
          localStorage.setItem("outlet-" + item.id_outlet, JSON.stringify(items));
        }
      });

    this.router.navigateByUrl('/list-product/' + item.id_category_outlet + '/detail-product/' + item.id_outlet);
  }
}
