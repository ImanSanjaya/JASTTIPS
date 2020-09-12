import { Component, OnInit } from "@angular/core";
import { JasttipsDataService } from "src/app/api/jasttips-data.service";
import { ActivatedRoute, Route } from "@angular/router";
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: "app-promo-product",
  templateUrl: "./promo-product.page.html",
  styleUrls: ["./promo-product.page.scss"],
})
export class PromoProductPage implements OnInit {
  promoItemId = this.route.snapshot.paramMap.get("promoItemId");

  promoItems: any;

  total = 0

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadDataPromo();
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      this.loadDataPromo();
      event.target.complete();
    }, 2000);
  }

  loadDataPromo() {
    this.jasttipsDataService.getListItemPromo().subscribe((rest) => {
      let data = rest['item_promo'].map((data) => {
        return {
          ...data,
          qty: 0,
          sub_total: 0
        };
      })

      data.map((data) => {
        if (data.id_item === this.promoItemId) {          
          this.promoItems = data
        }
      })
    }) 
  }

  // increment(item) {
  //   item.qty += 1
  //   item.subtotal = item.price_item_promo * item.qty;
  //   item.total = item.subtotal;

  //   localStorage.setItem(this.name_item_promo, JSON.stringify(this.itemPromo))
  //   // this.cartService.addItem(item)
  // }

  // decrement(item) {
  //   if ((item.qty < 1)) {
  //     item.qty = 0;
  //   } else {
  //     item.qty -= 1
  //     item.subtotal = item.price_item_promo * item.qty;
  //     item.total = item.subtotal;

  //   localStorage.setItem(this.name_item_promo, JSON.stringify(this.itemPromo))
  //     // this.cartService.reduceItem(item)
  //   }
  // }

  
}
