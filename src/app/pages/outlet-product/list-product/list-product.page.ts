import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JasttipsDataService } from "../../../api/jasttips-data.service";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.page.html",
  styleUrls: ["./list-product.page.scss"],
})
export class ListProductPage implements OnInit, OnDestroy {

  productId = this.route.snapshot.paramMap.get("productId");
  
  category: any;
  products: any;
  cartItemCount: any;

  interval: any;

  constructor(
    private jasttipsService: JasttipsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getItemCount();
    this.reloadItemCount();
  }

  ionViewWillLeave() {
    this.getData();

    this.getItemCount();
    this.reloadItemCount();
  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getData();
      event.target.complete();
    }, 2000);
  }

  getData() {
    this.jasttipsService.getListCategory().subscribe((rest) => {
      rest["category"].map((data) => {
        if (data.id_category_outlet === this.productId) {
          this.category = data;
          
          this.jasttipsService
            .getListOutlet(data.id_category_outlet)
            .subscribe((rest) => {
              this.products = rest["outlet"];
            });
        }
      });
    });
  }

  getItemCount() {
    let itemCount;

    itemCount = localStorage.getItem("cartItemCount");
    this.cartItemCount = itemCount > 0 ? itemCount : 0;
  }

  reloadItemCount() {
    this.interval = setInterval(() => {
      this.getItemCount();
    }, 1000)
  }

  filterData(ev: any) {
    const val = ev.target.value;
    this.jasttipsService.getListCategory().subscribe((rest) => {
      rest["category"].map((data) => {
        if (data.id_category_outlet === this.productId) {
          if (data.id_category_outlet) {
            this.jasttipsService
              .getListOutlet(data.id_category_outlet)
              .subscribe((rest) => {
                this.products = rest.outlet;

                if (val && val.trim() != "") {
                  this.products = this.products.filter((dataItems) => {
                    return (
                      dataItems.name_outlet
                        .toLowerCase()
                        .indexOf(val.toLowerCase()) > -1
                    );
                  });
                }
              });
          }
        }
      });
    });
  }

  clickDetailProduct(product) {
    this.jasttipsService
      .getListItem(product.id_outlet)
      .subscribe((data) => {

        let items = data["item"].map((item) => {
          return {
            ...item,
            qty: 0,
            sub_total: 0,
          };
        });

        if (localStorage.getItem("outlet-" + product.id_outlet)) {
          
        } else {
          localStorage.setItem("outlet-" + product.id_outlet, JSON.stringify(items));
        }
      });

    this.router.navigateByUrl(
      "/list-product/" + this.productId + "/detail-product/" + product.id_outlet
    );
  }

  clickInformation(productId) {
    localStorage.setItem("info", "manually-category-" + productId);
    this.router.navigateByUrl(
      "/list-product/" + productId + "/information/" + productId
    );
  }

  clickInformationToCart(productId) {
    localStorage.setItem("info", "cart");
    this.router.navigateByUrl(
      "/list-product/" + productId + "/information/" + productId
    );
  }
}
