import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { UsersService } from './users.service';
import { TokenError } from '../api/users/users.type';
import { TOKEN_LOCAL_STORAGE_KEY, USER_ID_LOCAL_STORAGE_KEY } from '../misc/constants/local-storage';
import { NavigationService } from './navigation.service';
import { NotificationService } from './notification.service';

/**
 * @class AuthInterceptor
 * @description An interceptor that adds the token to the request headers
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * @description The users service
   * @type {UsersService}
   */
  private readonly userService: UsersService = inject(UsersService);

  /**
   * @description The notification service
   * @type {NotificationService}
   */
  private readonly notificationService: NotificationService = inject(NotificationService);

  /** @inheritdoc */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token
    const token = this.userService.currentToken;

    // If token exists, add it to the request headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(tap((event) => {
      if (event instanceof HttpResponse) {
        if(TokenError[event.body.message as keyof typeof TokenError]) {
        this.userService.logout()
        this.notificationService.errorNotification('global.errors.logAgain');
      }
    }
    }));
  }
}
