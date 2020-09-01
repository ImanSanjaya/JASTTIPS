import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JasttipsDataService } from '../api/jasttips-data.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: any[] = [];

  private chart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(
  ) { }

  getChart() {
    return this.chart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addItem(item) {
    
    item.qty += 1;
    this.cartItemCount.next(this.cartItemCount.value + 1)
  }

  removeItem(item) {

  }
}
