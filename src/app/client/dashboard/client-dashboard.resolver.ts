import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../../services/users.service";
import { LoadingService } from "../../services/loading.service";
import { ClientRequestsService } from "../service/requests.service";
import { RequestTableElement } from "../../core/layouts/orders/orders.component";

/**
 * @class ClientDashboardClientResolver
 * @description The client dashboard client resolver
 */
@Injectable()
export class ClientDashboardClientResolver implements Resolve<RequestTableElement[]> {
  /**
  * @description The users service
  * @type {UsersService}
  */
  private readonly userService: UsersService = inject(UsersService);

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
  
  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<RequestTableElement[]> {
    this.loadingService.startLoading()
    const results = (await this.requestsService.getItemsOrders(this.userService.currentUserId))
    this.loadingService.endLoading()
    return results
  }
}