import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { CheckSignupService } from './services/check-signup.service';

const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-up",
    pathMatch: "full",
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./pages/sign-up/sign-up.module").then(
        (m) => m.SignUpPageModule
      ),canLoad: [CheckSignupService]
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: "list-product/2",
    loadChildren: () =>
      import("./pages/order/order.module").then((m) => m.OrderPageModule),
  },
  {
    path: "list-product/:productId",
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "./pages/outlet-product/list-product/list-product.module"
          ).then((m) => m.ListProductPageModule),
      },
      {
        path: "detail-product/:detailProductId",
        loadChildren: () =>
          import(
            "./pages/outlet-product/detail-product/detail-product.module"
          ).then((m) => m.DetailProductPageModule),
      },
    ],
  },
  {
    path: "order",
    loadChildren: () =>
      import("./pages/order/order.module").then((m) => m.OrderPageModule),
  },
  {
    path: "delivery-order",
    loadChildren: () =>
      import(
        "./pages/outlet-product/delivery-order/delivery-order.module"
      ).then((m) => m.DeliveryOrderPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
