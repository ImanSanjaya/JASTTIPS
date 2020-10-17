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
      ), canLoad: [CheckSignupService]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./pages/dashboard/dashboard.module").then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'promo-product/:promoItemId',
    loadChildren: () => import('./pages/outlet-product/promo-product/promo-product.module').then(m => m.PromoProductPageModule)
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
        path: "information/:orderId",
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "./pages/information/information.module"
              ).then((m) => m.InformationPageModule),
          },
          {
            path: "order/:orderId",
            loadChildren: () =>
              import(
                "./pages/order/order.module"
              ).then((m) => m.OrderPageModule),
          }
        ]
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
    path: "delivery-order",
    loadChildren: () =>
      import(
        "./pages/outlet-product/delivery-order/delivery-order.module"
      ).then((m) => m.DeliveryOrderPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
