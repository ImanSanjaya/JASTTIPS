import { Component, OnInit } from "@angular/core";
import { JasttipsDataService } from "src/app/api/jasttips-data.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: "app-promo-product",
  templateUrl: "./promo-product.page.html",
  styleUrls: ["./promo-product.page.scss"],
})
export class PromoProductPage implements OnInit {
  itemPromo: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.getItemListPromo();
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      this.getItemListPromo();
      event.target.complete();
    }, 2000);
  }

  getItemListPromo() {
    let data = this.activatedRoute.snapshot.paramMap.get("data");
    this.itemPromo = JSON.parse(data);
    console.log(this.itemPromo);
  }

  decrement(item) {
    if ((item.qty < 1)) {
      item.qty = 0;
    } else {
      item.total = item.price_item_promo * 1;
      item.subtotal -= item.total;
      this.cartService.reduceItem(item)
    }
  }

  increment(item) {
    item.total = item.price_item_promo * 1;
    item.subtotal += item.total;
    this.cartService.addItem(item)
  }
}
