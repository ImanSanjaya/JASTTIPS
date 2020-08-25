import { Component, OnInit } from '@angular/core';
import { JasttipsDataService } from '../../api/jasttips-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  listCategory: any;

  constructor(private jasttipsDataService: JasttipsDataService) {}

  ngOnInit() {
    this.getData();
  }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 300,
  };

  getData() {
    this.jasttipsDataService.getListCategory().subscribe((rest) => {
      this.listCategory = rest.category;
    });
  }
}
