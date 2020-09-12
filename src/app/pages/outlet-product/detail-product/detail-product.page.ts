import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { JasttipsDataService } from "../../../api/jasttips-data.service";
import { BehaviorSubject, Observable } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.page.html",
  styleUrls: ["./detail-product.page.scss"],
})
export class DetailProductPage implements OnInit {
  detailProductId = this.route.snapshot.paramMap.get("detailProductId");

  items: any;

  nameOutlet: any;
  imgOutlet: any;

  nameItem: any;

  getStoragePromo: any;

  cartItemCount: BehaviorSubject<number>;

  totalItem: any;
  total: any;

  menuSegment: string;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.menuSegment = "menuLengkap";
    this.loadData();
    this.loadGetData();

    setInterval(() => {
      this.loadGetData()
    }, 500)
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      this.loadData();
      event.target.complete();
    }, 2000);
  }

  loadData() {
    this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((data) => {
        
        let getStorage = JSON.parse(localStorage.getItem('outlet-'+ this.detailProductId))

        this.items = data["item"].map((item) => {
          
          this.nameOutlet = item["name_outlet"];
          this.imgOutlet = item["img_path_outlet"];

          let itemsFilter = getStorage.filter(id => id.id_item === item.id_item)

          if (item.status_promo == "1") {
            this.nameItem = item.name_item.replace(/\s/g, "-").toLowerCase()
            this.getStoragePromo = JSON.parse(localStorage.getItem(this.nameItem))
          }

          return {
            ...item,
            qty: itemsFilter[0].qty,
            sub_total: itemsFilter[0].sub_total
          };
          
        });
      });
  }

  loadGetData() {
    if (localStorage.getItem('outlet-'+ this.detailProductId)){
      let getStorage = JSON.parse(localStorage.getItem('outlet-' + this.detailProductId))

      let subTotal = getStorage.map(data => data.sub_total)
      this.totalItem = subTotal.reduce((a,b)=>{return a + b},0)
    }
    this.total = this.totalItem > 0 ? this.totalItem : 0
  }

  increment(item) {
    let added = false;

    this.items.map((data) => {
      if (data.id_item === item.id_item) {
        item.qty += 1

        if (item.status_promo == '1') {
          item.sub_total = item.price_item_promo * item.qty
        } else {
          item.sub_total = item.price_item * item.qty
        }
      }
      added = true
    })
    localStorage.setItem('outlet-' + this.detailProductId, JSON.stringify(this.items))
    this.cartService.addItem(item);
  }

  decrement(item) {
    let added = false;

    if (item.qty < 1) {
      item.qty = 0;
    } else {
      this.items.map((data) => {
        if (data.id_item === item.id_item) {
          item.qty -= 1
  
          if (item.status_promo == '1') {
            item.sub_total = item.price_item_promo * item.qty
          } else {
            item.sub_total = item.price_item * item.qty
          }
        }
        added = true
      })
      localStorage.setItem('outlet-' + this.detailProductId, JSON.stringify(this.items))
      this.cartService.reduceItem(item);
    }
  }

  setCart() {
    this.router.navigateByUrl("/delivery-order");
  }
}
