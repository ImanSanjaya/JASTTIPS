import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JasttipsDataService } from 'src/app/api/jasttips-data.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {


  productId = this.route.snapshot.paramMap.get("productId");

  category: any;

  getStorageInfo: any;
  
  constructor(
    private jasttipsService: JasttipsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
    this.getStorageInfo = localStorage.getItem("info");
  }

  getData() {
    this.jasttipsService.getListCategory().subscribe((rest) => {
      rest["category"].map((data) => {
        if (data.id_category_outlet === this.productId) {
          this.category = data;
          console.log(data);
        }
      });
    });
  }

  clickOrder(productId) {

    if (this.getStorageInfo == "cart") {
      this.router.navigateByUrl(  
        "/delivery-order"
      );
    } else if (this.getStorageInfo == "manually-category-" + productId) {
      this.router.navigateByUrl(
        "/list-product/" + productId + "/information/" + productId + "/order/" + productId
      );
    } else if (this.getStorageInfo == "ordering-items") {
      this.router.navigateByUrl(
        "/list-product/" + productId + "/information/" + productId + "/order/" + productId
      );
    }
  }

}
