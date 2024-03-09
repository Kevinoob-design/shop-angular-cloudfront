import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'

import { CartCountControlsModule } from '../core/cart-count-controls/cart-count-controls.module'
import { ProductItemComponent } from './product-item/product-item.component'
import { ProductsComponent } from './products.component'

@NgModule({
  declarations: [ProductsComponent, ProductItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CartCountControlsModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule {}
