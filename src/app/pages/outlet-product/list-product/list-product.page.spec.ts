import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListProductPage } from './list-product.page';

describe('ListProductPage', () => {
  let component: ListProductPage;
  let fixture: ComponentFixture<ListProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
