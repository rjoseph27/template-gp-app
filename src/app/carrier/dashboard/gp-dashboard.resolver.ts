import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../../services/users.service";
import { LoadingService } from "../../services/loading.service";
import { RequestTableElement } from "../../core/layouts/orders/orders.component";
import { CarrierRequestsService } from "../service/requests.service";


@Injectable()
export class CarrierDashboardResolver implements Resolve<RequestTableElement[]> {
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
    * @type {CarrierRequestsService}
    */
  protected readonly requestsService = inject(CarrierRequestsService);
  
  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<RequestTableElement[]> {
    this.loadingService.startLoading()
    const results = (await this.requestsService.getItemsOrdersForGp(this.userService.currentUserId))
    this.loadingService.endLoading()
    return results
  }
}