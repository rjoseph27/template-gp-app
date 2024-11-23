import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from './users.service';
import { AccountType } from '../api/users/users.type';

/**
 * @class CarrierModuleResolver
 * @description The resolver for the carrier module
 */
@Injectable()
export class CarrierModuleResolver implements Resolve<any> {
  /**
   * @description The user service
   * @type {UsersService}
   */
  private readonly usersService = inject(UsersService);

  /** @inheritdoc */
  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    this.usersService.accountType = AccountType.CARRIER;
    return null;
  }
}
