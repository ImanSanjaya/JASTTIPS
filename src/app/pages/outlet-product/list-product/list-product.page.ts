import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JasttipsDataService } from "../../../api/jasttips-data.service";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.page.html",
  styleUrls: ["./list-product.page.scss"],
})
export class ListProductPage implements OnInit {
  productId = this.route.snapshot.paramMap.get("productId");

  nameCategory: any;

  products: any;

  items: any;

  itemCount: any;
  cartItemCount: any;

  constructor(
    private jasttipsService: JasttipsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
    setInterval(() => {
      this.getItemCount();
    }, 1000);
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
          this.nameCategory = data.name_category_outlet;
          this.jasttipsService
            .getListOutlet(data.id_category_outlet)
            .subscribe((restOutlet) => {
              this.products = restOutlet["outlet"];
            });
        }
      });
    });
  }

  getItemCount() {
    this.itemCount = localStorage.getItem("cartItemCount");
    this.cartItemCount = this.itemCount > 0 ? this.itemCount : 0;
  }

  filterData(ev: any) {
    const val = ev.target.value;
    this.jasttipsService.getListCategory().subscribe((rest) => {
      rest["category"].map((data) => {
        if (data.id_category_outlet === this.productId) {
          if (data.id_category_outlet) {
            this.jasttipsService
              .getListOutlet(data.id_category_outlet)
              .subscribe((restListOutlet) => {
                this.nameCategory = data.name_category_outlet;
                this.products = restListOutlet.outlet;

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
        this.items = data["item"].map((item) => {
          return {
            ...item,
            qty: 0,
            sub_total: 0,
          };
        });

        if (localStorage.getItem("outlet-" + product.id_outlet)) {
          console.log("data sudah ada");
        } else {
          localStorage.setItem(
            "outlet-" + product.id_outlet,
            JSON.stringify(this.items)
          );
        }
      });

    this.router.navigateByUrl(
      "/list-product/" + this.productId + "/detail-product/" + product.id_outlet
    );
  }
}
