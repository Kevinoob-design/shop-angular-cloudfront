import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

import { FilePickerComponent } from './file-picker.component'

@NgModule({
	declarations: [FilePickerComponent],
	imports: [CommonModule, MatButtonModule],
	exports: [FilePickerComponent]
})
export class FilePickerModule {}
