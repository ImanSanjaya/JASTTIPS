import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListProductService {
  data: any;

  constructor(public http: HttpClient) {}

  dashboardData(): any {
    return this.http.get('assets/data/data.json');
  }

  productListData(): any {
    return this.http.get('assets/data/outlet-product.json');
  }
}
