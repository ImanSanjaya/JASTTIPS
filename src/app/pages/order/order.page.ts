import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JasttipsDataService } from 'src/app/api/jasttips-data.service';
import { UserData } from 'src/app/api/user-data';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  productId = this.route.snapshot.paramMap.get("productId");

  category: any;

  username: string;
  no_telp_user: string;
  noWaAdmin: any;

  getStorageInfo: any;

  constructor(
    private jasttipsService: JasttipsDataService,
    private route: ActivatedRoute,
    private userData: UserData,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
    this.getUsername();
    this.getNoTelpUser();
    this.getNoAdmin();

    this.getStorage();
  }

  getData() {
    this.jasttipsService.getListCategory().subscribe((rest) => {
      rest["category"].map((data) => {
        if (data.id_category_outlet === this.productId) {
          this.category = data;
        }
      });
    });
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

  getNoAdmin() {
    this.jasttipsService.getNumberWhatsApp().subscribe(res => {
      this.noWaAdmin = res.number_whatsapp.map(data => {
        return data.no_wa;
      })
    });
  }

  getStorage() {
    this.getStorageInfo = localStorage.getItem("info"); 
  }

  formOrderItems = {
    menu: "",
    outlet: ""
  };

  formDeliverItems = {
    jenisBarang: "",
    alamatAmbil: "",
    namaPenerima: "",
    noWaPenerima: "",
    alamatPengirim: ""
  };

  orderManual(nameCategory) {
    this.router.navigateByUrl('/dashboard');

    window.open(
      this.jasttipsService.sendMessageForManuallyOrder(
        this.noWaAdmin,
        this.username,
        this.no_telp_user,
        nameCategory,
        this.formOrderItems
      )
    )
  }

  orderItems() {
    this.router.navigateByUrl('/dashboard');

    window.open(
      this.jasttipsService.sendMessageForDeliverItems(
        this.noWaAdmin,
        this.username,
        this.no_telp_user,
        this.formDeliverItems
      )
    );
  }
}
