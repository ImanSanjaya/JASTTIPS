import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { BehaviorSubject } from 'rxjs';

import { JasttipsDataService } from "../../../api/jasttips-data.service";
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.page.html",
  styleUrls: ["./list-product.page.scss"],
})
export class ListProductPage implements OnInit {
  productId = this.route.snapshot.paramMap.get("productId");
  nameCategory: any;
  listProduct: any;

  cart = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(
    private jasttipsDataService: JasttipsDataService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getData();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();

    let jsonParse = JSON.parse(localStorage.getItem('pushItem'));

    console.log(jsonParse);
    

  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getData();
      event.target.complete();
    }, 2000);
  }

  getData() {
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      if (rest && rest.category) {
        for (const listProduct of rest.category) {
          if (listProduct && listProduct.id_category_outlet === this.productId) {
            const idProduct = listProduct.id_category_outlet;

            if (idProduct) {
              this.jasttipsDataService
                .getListOutlet(idProduct)
                .subscribe((rest: any) => {
                  this.nameCategory = listProduct.name_category_outlet;
                  this.listProduct = rest.outlet;
                });
            }
          }
        }
      }
    });
  }

  filterData(ev: any) {
    const val = ev.target.value;
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      if (rest && rest.category) {
        for (const listProduct of rest.category) {
          if (listProduct && listProduct.id_category_outlet === this.productId) {
            const idProduct = listProduct.id_category_outlet;

            if (idProduct) {
              this.jasttipsDataService
                .getListOutlet(idProduct)
                .subscribe((rest: any) => {
                  this.nameCategory = listProduct.name_category_outlet;
                  this.listProduct = rest.outlet;

                  if (val && val.trim() != "") {
                    this.listProduct = this.listProduct.filter((item) => {
                      return (
                        item.name_outlet
                          .toLowerCase()
                          .indexOf(val.toLowerCase()) > -1
                      );
                    });
                  }
                });
            }
          }
        }
      }
    });
  }
  
}
