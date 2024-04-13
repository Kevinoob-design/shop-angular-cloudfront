import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'

import { CartCountControlsComponent } from './cart-count-controls.component'

@NgModule({
	declarations: [CartCountControlsComponent],
	imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule],
	exports: [CartCountControlsComponent]
})
export class CartCountControlsModule {}
