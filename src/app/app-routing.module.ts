import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProductsComponent } from './products/products.component'

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((mod) => mod.CartModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
