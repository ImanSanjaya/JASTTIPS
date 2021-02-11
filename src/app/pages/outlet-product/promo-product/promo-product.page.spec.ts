import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromoProductPage } from './promo-product.page';

describe('PromoProductPage', () => {
  let component: PromoProductPage;
  let fixture: ComponentFixture<PromoProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromoProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
