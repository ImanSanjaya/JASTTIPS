import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  detailOutlet() {
    this.router.navigate(['detail-product']);
  }
}
