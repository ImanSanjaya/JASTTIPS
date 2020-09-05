import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromoProductPageRoutingModule } from './promo-product-routing.module';

import { PromoProductPage } from './promo-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromoProductPageRoutingModule
  ],
  declarations: [PromoProductPage]
})
export class PromoProductPageModule {}
