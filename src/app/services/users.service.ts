import { Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';
import { ConnectStatus, CreateUser, Credentials, UniqueValue } from '../api/users/users.type';
import { UsersServiceApi } from '../api/users/users.service.api';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


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
  * @param credentials The credentials of the user
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

   /**
    * @description Creates a new user
    * @param newUser The new user to create
    * @returns {Promise<boolean>}
    */
   create(newUser: CreateUser): Promise<boolean> {
    return this.usersServiceApi.createUser(newUser).then(msg => {
      console.log(msg)
      return false;
    });
   }

   /**
    * @description Checks if the email is taken
    * @param email The email to check
    * @returns {Promise<boolean>}
    */
   isEmailTaken(email: string): Promise<boolean> {
    return this.usersServiceApi.isEmailTaken(email).then(msg => {
      if(msg.message === UniqueValue.TAKEN) {
        return true;
      }
      return false;
    });
   }
}