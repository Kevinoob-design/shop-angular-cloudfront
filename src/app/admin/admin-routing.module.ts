import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { EditProductComponent } from './edit-product/edit-product.component'
import { ManageProductsComponent } from './manage-products/manage-products.component'
import { OrdersComponent } from './orders/orders.component'

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'products',
    component: ManageProductsComponent
  },
  {
    path: 'products/new',
    component: EditProductComponent
  },
  {
    path: 'products/:productId',
    component: EditProductComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
