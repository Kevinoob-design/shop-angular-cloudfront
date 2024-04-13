import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table'

import { FilePickerModule } from '../shared/file-picker/file-picker.module'
import { AdminRoutingModule } from './admin-routing.module'
import { EditProductComponent } from './edit-product/edit-product.component'
import { ManageProductsComponent } from './manage-products/manage-products.component'
import { ManageProductsService } from './manage-products/manage-products.service'
import { OrdersComponent } from './orders/orders.component'
import { OrdersService } from './orders/orders.service'

@NgModule({
	declarations: [OrdersComponent, ManageProductsComponent, EditProductComponent],
	imports: [
		AdminRoutingModule,
		CommonModule,
		FilePickerModule,
		MatCardModule,
		MatInputModule,
		MatTableModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		ReactiveFormsModule
	],
	providers: [OrdersService, ManageProductsService]
})
export class AdminModule {}
