/** 
        this.currencyRates.next(await this.currencyService.getCurrency(this._currency$.value)) */

import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { LoadingService } from "../../services/loading.service";
import { CurrencyService } from "../../services/currency.service";
import { UsersService } from "../../services/users.service";
import { MoneyUtil } from "../../misc/util/money.util";

/**
 * @class PartnerBillingResolver
 * @description The partner billing resolver
 */
@Injectable()
export class PartnerBillingResolver implements Resolve<any> {
  /**
  * @description The loading service
  * @returns {LoadingService}
  */
  private readonly loadingService: LoadingService = inject(LoadingService)

  /**
   * @description The currency service
   * @type {CurrencyService}
   */
  private readonly currencyService = inject(CurrencyService);

  /**
  * @description The users service
  * @type {UsersService}
  */
  protected readonly userService: UsersService = inject(UsersService);

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.loadingService.startLoading();
    const currency =  await this.userService.getPartnerUserInfo(this.userService.currentUserId).then(user => MoneyUtil.getSuccursaleCurrency(user.succursale).currency)
    const rates = await this.currencyService.getCurrency(currency);
    this.loadingService.endLoading();
    return { currency, rates }
  }
}