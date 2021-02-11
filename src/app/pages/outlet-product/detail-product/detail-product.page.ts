import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { JasttipsDataService } from "../../../api/jasttips-data.service";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.page.html",
  styleUrls: ["./detail-product.page.scss"],
})
export class DetailProductPage implements OnInit {

  detailProductId = this.route.snapshot.paramMap.get("detailProductId");
  items: any;
  total: any;
  
  menuSegment = "menuLengkap";

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 2000);
  }

  funSetTimeOut() {
    setTimeout(() => {
      this.loadData();
    }, 0);
  }

  loadData() {
    this.jasttipsDataService
      .getListItem(this.detailProductId)
      .subscribe((data) => {
        
        let getStorage = JSON.parse(localStorage.getItem('outlet-'+ this.detailProductId))

        this.items = data["item"].map((item) => {

          let itemsFilter = getStorage.filter(data => data.id_item === item.id_item);

          return {
            ...item,
            qty: itemsFilter[0].qty,
            sub_total: itemsFilter[0].sub_total
          };
          
        });
      });

      let totalItem;

      if (localStorage.getItem('outlet-'+ this.detailProductId)){
        let getStorage = JSON.parse(localStorage.getItem('outlet-' + this.detailProductId));
        let subTotal = getStorage.map(data => data.sub_total);
        totalItem = subTotal.reduce((a,b)=>{return a + b},0);
      }
      this.total = totalItem > 0 ? totalItem : 0;
  }

  increment(item) {
    this.items.map((data) => {
      if (data.id_item === item.id_item) {
        item.qty += 1

        if (item.status_promo == '1') {
          item.sub_total = item.price_item_promo * item.qty
        } else {
          item.sub_total = item.price_item * item.qty
        }
      }
    })
    localStorage.setItem('outlet-' + this.detailProductId, JSON.stringify(this.items))
    this.cartService.addItem(item);

    this.funSetTimeOut();
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

    this.funSetTimeOut();
  }

  setCart() {
    this.router.navigateByUrl("/delivery-order");
  }
}
