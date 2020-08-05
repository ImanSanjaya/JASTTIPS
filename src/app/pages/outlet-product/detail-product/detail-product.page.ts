import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
  private namaMakanan = 'Gurame Bakar';
  private harga = 13000;
  private currentNumber = 0;
  private subTotal = 0;

  menuSegment: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuSegment = 'rekomendasi';
  }

  private decrement() {
    if (this.currentNumber < 1) {
      this.currentNumber = 0;
    } else {
      this.currentNumber--;
      this.subTotal = this.harga * this.currentNumber;
    }
  }

  private increment() {
    this.currentNumber++;
    this.subTotal = this.harga * this.currentNumber;
  }

}
