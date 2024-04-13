import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule, Provider } from '@angular/core'
import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { CartModule } from './cart/cart.module'
import { HeaderComponent } from './core/header/header.component'
import { CONFIG_TOKEN } from './core/injection-tokens/config.token'
import { ErrorPrintInterceptor } from './core/interceptors/error-print.interceptor'
import { ProductsModule } from './products/products.module'

const interceptors: Provider[] = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorPrintInterceptor,
		multi: true
	}
]

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatTooltipModule,
		ProductsModule,
		CartModule,
		HttpClientModule,
		MatBadgeModule,
		MatSnackBarModule
	],
	providers: [
		interceptors,
		{
			provide: CONFIG_TOKEN,
			useValue: environment
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
