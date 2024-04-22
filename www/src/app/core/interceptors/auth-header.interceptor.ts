import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { NotificationService } from '../notification.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor (private readonly notificationService: NotificationService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const password = window.localStorage.getItem('authorization_token')

		const authToken = `Basic ${password}`

		const authReq = request.url.includes('shop-aws-epam-learn-import-product-bucket') ?
			request.clone() :
			request.clone({ headers: request.headers.set('Authorization', authToken) })

		return next.handle(authReq)
	}
}
