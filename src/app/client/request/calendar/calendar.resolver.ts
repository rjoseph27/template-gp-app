import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ClientSendItemsService } from "../../service/send-items.service";
import { Injectable, inject } from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import { ClientRoutes } from "../../client.route";
import { DateUtil } from "../../../misc/util/date.util";
import { ClientRequestsService } from "../../service/requests.service";
import { CurrencyService } from "../../../services/currency.service";

/**
 * @class ClientCalendarResolver
 * @description The resolver for the client calendar
 */
@Injectable()
export class ClientCalendarResolver implements Resolve<any> {
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
   * @description The router service
   * @type {Router}
   */
  private readonly router = inject(Router);

  /**
  * @description The send items service
  * @type {ClientSendItemsService}
  */ 
  private readonly sendItemsService = inject(ClientSendItemsService);

  /**
   * @description The currency service
   * @type {CurrencyService}
   */
  private readonly currencyService = inject(CurrencyService);

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.loadingService.startLoading();
    if(this.sendItemsService.requests) {
            const trips = await this.requestsService.searchTrips(this.sendItemsService.requests);
            const currency = await this.currencyService.getCurrency(this.sendItemsService.requests.currency);
            this.loadingService.endLoading();
            return {
                trips: trips,
                rates: currency
            };
    } else {
        this.router.navigate([ClientRoutes.sendItems.fullPath()]); 
        this.loadingService.endLoading();
        return undefined;
    }
  }
}