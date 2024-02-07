import { Injectable, inject } from '@angular/core';
import * as bcrypt from 'bcryptjs'
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
    bcrypt.hash(credentials.password, 10, async (err, hash) => {
      const test = await this.usersServiceApi.connect({email: credentials.email, password: hash});
      console.log(test)
    });
   }
}