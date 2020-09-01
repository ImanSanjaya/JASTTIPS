import { Component, OnInit } from '@angular/core';
import { JasttipsDataService } from '../../api/jasttips-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  username: string;
  no_telp_user: string;

  listCategory: any;

  constructor(private jasttipsDataService: JasttipsDataService) {}

  ngOnInit() {
    this.username = localStorage.getItem('username')
    this.no_telp_user = localStorage.getItem('no_telp_user')
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
