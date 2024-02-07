import { Injectable, inject } from '@angular/core';
import { Credentials, UsersServiceApi } from '../api/users.service.api';


/**
 * @class UsersService
 * @description The users service
 */
@Injectable()
export class UsersService {
  private readonly usersServiceApi: UsersServiceApi = inject(UsersServiceApi); 

  /** 
  * @description Logs the user in
  * @returns {void}
  */
  login(credentials: Credentials) {
    this.usersServiceApi.connect({email: credentials.email, password: credentials.password}).then(x => localStorage.setItem('token', x.token));
   }
}