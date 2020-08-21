import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  data: any;

  constructor(public http: HttpClient) {}

  load(): any {
    return this.http.get('assets/data/data.json');
  }

  getDashboard() {
    return this.load().pipe(
      map((data: any) => {
        return data.dashboard;
      })
    );
  }

}
