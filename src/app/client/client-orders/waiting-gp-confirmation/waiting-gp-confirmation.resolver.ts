import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { LoadingService } from "../../../services/loading.service";
import { ClientRequestsService } from "../../service/requests.service";
import { CurrencyService } from "../../../services/currency.service";
import { RequestTableElementRequest } from "../../../api/requests/requests.type";
import { UsersService } from "../../../services/users.service";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { ClientRoutes } from "../../../client.route";
import { OrderDetails } from "../../../core/layouts/order-details/order-details.component";

/**
 * @class ClientWaitingGpConfirmationResolver
 * @description The resolver for the waiting gp confirmation component
 */
@Injectable()
export class ClientWaitingGpConfirmationResolver implements Resolve<OrderDetails> {
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

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<OrderDetails> {
    this.loadingService.startLoading();
    const order = await this.requestsService.getItemInformation(<RequestTableElementRequest>route.queryParams);
    if(order) {
        const userCountry = (await this.userService.getUserInfo(this.userService.currentUserId)).country;
        const userCurrency = COUNTRY_INFO_LIST.find(country => country.name === userCountry).currency;
        const currency = await this.currencyService.getCurrency(userCurrency.currency);
        const newPrice = order.price / currency[order.currency];
        order.price = Math.round(newPrice);
        this.loadingService.endLoading();
        return order
    } else {
        this.loadingService.endLoading();
        this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
        return null;
    }
  }
}