import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { LoadingService } from "../../../services/loading.service";
import { ClientRoutes } from "../../client.route";
import { ClientRequestsService } from "../../service/requests.service";
import { RequestTableElementRequest } from "../../../api/requests/requests.type";
import { ClientSendItemsService } from "../../service/send-items.service";
import { CurrencyService } from "../../../services/currency.service";
import { UsersService } from "../../../services/users.service";
import { ItemsStatus } from "../base-orders.component";

/**
 * @class ClientRescheduleOrderResolver
 * @description The client reschedule order resolver
 */
@Injectable()
export class ClientRescheduleOrderResolver implements Resolve<any> {
  /**
  * @description The loading service
  * @returns {LoadingService}
  */
  private readonly loadingService: LoadingService = inject(LoadingService)

  /**
   * @description The requests service
   * @type {ClientRequestsService}
   */
  protected readonly requestsService = inject(ClientRequestsService);

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

  /**
  * @description The users service
  * @type {UsersService}
  */
  private readonly userService: UsersService = inject(UsersService);

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.loadingService.startLoading();
    const order = await this.requestsService.getItemInformation(<RequestTableElementRequest>route.queryParams).catch(() => {
        this.loadingService.endLoading();
        this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
        return undefined;
    });
    const sendInfo = await this.requestsService.getSendItemsInfo(order.itemGroupId);
    sendInfo.itemInformation = sendInfo.itemInformation.filter(item => item.id.toString() === (<RequestTableElementRequest>route.queryParams).id);
    this.sendItemsService.requests = sendInfo;
    this.loadingService.endLoading();
    if(this.sendItemsService.requests) {
        if(this.sendItemsService.requests.userId !== this.userService.currentUserId) {
            this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
            return undefined;
        }
        const trips = await this.requestsService.searchTrips(this.sendItemsService.requests);
        const currency = await this.currencyService.getCurrency(this.sendItemsService.requests.currency);
        this.loadingService.endLoading();
        return {
            trips: trips,
            rates: currency
        }
    } else {
        this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
        this.loadingService.endLoading();
        return undefined;
    }
  }
}