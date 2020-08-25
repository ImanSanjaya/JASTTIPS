import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'list-product/3',
    loadChildren: () =>
      import('./pages/order/order.module').then((m) => m.OrderPageModule),
  },
  {
    path: 'list-product/:productId',
    loadChildren: () =>
      import('./pages/outlet-product/list-product/list-product.module').then(
        (m) => m.ListProductPageModule
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./pages/order/order.module').then((m) => m.OrderPageModule),
  },
  {
    path: 'detail-product',
    loadChildren: () =>
      import(
        './pages/outlet-product/detail-product/detail-product.module'
      ).then((m) => m.DetailProductPageModule),
  },
  {
    path: 'delivery-order',
    loadChildren: () =>
      import(
        './pages/outlet-product/delivery-order/delivery-order.module'
      ).then((m) => m.DeliveryOrderPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
