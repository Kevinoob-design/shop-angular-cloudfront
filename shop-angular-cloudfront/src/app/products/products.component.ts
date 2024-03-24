import { Component } from '@angular/core'
import { Observable } from 'rxjs'

import { Product } from './product.interface'
import { ProductsService } from './products.service'

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
	readonly products$: Observable<Product[]> = this.productsService.getProducts()

	constructor(private readonly productsService: ProductsService) {}
}
