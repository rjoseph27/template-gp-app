import { Injectable, inject } from "@angular/core";
import { OrderDetails } from "../../core/layouts/order-details/order-details.component";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { LoadingService } from "../../services/loading.service";
import { ClientRequestsService } from "../service/requests.service";
import { UsersService } from "../../services/users.service";
import { CurrencyService } from "../../services/currency.service";
import { COUNTRY_INFO_LIST } from "../../misc/constants/countries/countries";
import { RequestTableElementRequest } from "../../api/requests/requests.type";
import { MoneyUtil } from "../../misc/util/money.util";

/**
 * @class baseOrderDetailsResolver
 * @description The base order details resolver
 */
@Injectable()
export abstract class baseOrderDetailsResolver implements Resolve<OrderDetails> {
  /**
  * @description The loading service
  * @returns {LoadingService}
  */
  private readonly loadingService: LoadingService = inject(LoadingService)

  /**
   * @description The requests service
   * @type {ClientRequestsService}
   */
  private readonly requestsService = inject(ClientRequestsService);

  /**
  * @description The users service
  * @type {UsersService}
  */
  private readonly userService: UsersService = inject(UsersService);

  /**
   * @description The router service
   * @type {Router}
   */
  private readonly router = inject(Router);

  /**
   * @description The currency service
   * @type {CurrencyService}
   */
  private readonly currencyService = inject(CurrencyService);

  /**
   * @description The redirect to route
   * @type {string}
   */
  abstract redirectTo: string;

  /**
  * @description The show total price
  * @type {boolean}
  */
  protected showTotalPrice: boolean = true;

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<OrderDetails> {
    this.loadingService.startLoading();
    const order = await this.requestsService.getItemInformation(<RequestTableElementRequest>route.queryParams);
    if(order) {
        const userCountry = (await this.userService.getUserInfo(this.userService.currentUserId)).country;
        const userCurrency = COUNTRY_INFO_LIST.find(country => country.name === userCountry).currency;
        const currency = await this.currencyService.getCurrency(userCurrency.currency);
        order.price = Math.round(MoneyUtil.getPrice(order.itemInformation, {
            specificPrice: order.specificPrice,
            defaultPrice: order.defaultPrice
        }, currency[order.currency]));
        if(this.showTotalPrice) {
           order.price = MoneyUtil.totalPrice(order.price, currency[order.currency])
        }
        this.loadingService.endLoading();
        return order
    } else {
        this.loadingService.endLoading();
        this.router.navigate([this.redirectTo]);
        return null;
    }
  }
}