import { Injectable, inject } from '@angular/core';
import { ConnectStatus, Credentials, UsersServiceApi } from '../api/users.service.api';
import { NotificationService } from './notification.service';


/**
 * @class UsersService
 * @description The users service
 */
@Injectable()
export class UsersService {
  /**
   * @description The users service api
   * @type {UsersServiceApi}
   */
  private readonly usersServiceApi: UsersServiceApi = inject(UsersServiceApi); 

  /**
   * @description The notification service
   * @type {NotificationService}
   */
  private readonly notificationService: NotificationService = inject(NotificationService);

  /** 
  * @description Logs the user in
  * @returns {Promise<boolean>}
  */
  login(credentials: Credentials): Promise<boolean> {
    return this.usersServiceApi.connect({email: credentials.email, password: credentials.password}).then(msg => {
      if(msg.message === ConnectStatus.LOGIN_SUCCESSFUL) {
        localStorage.setItem('token', msg.token);
        // TODO redirect to the main page
      }
      return true;
    }).catch((e) => {
      if(e.error.message === ConnectStatus.WRONG_CREDENTIALS) {
        this.notificationService.errorNotification('global.login.errors.login.wrongCredentials');
      } else {
        this.notificationService.errorNotification('global.login.errors.login.internalServerError');
      }
      return false;
    });
   }
}