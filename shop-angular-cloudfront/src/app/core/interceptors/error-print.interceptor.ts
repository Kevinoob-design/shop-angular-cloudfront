import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { NotificationService } from '../notification.service'

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
	constructor(private readonly notificationService: NotificationService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			tap({
				error: () => {
					const url = new URL(request.url)

					this.notificationService.showError(
						`Request to "${url.pathname}" failed. Check the console for the details`,
						0
					)
				}
			})
		)
	}
}
