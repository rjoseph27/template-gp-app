import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ReportTrip, RequestTableElementRequest } from "../../../../api/requests/requests.type";
import { LoadingService } from "../../../../services/loading.service";
import { ClientRequestsService } from "../../../service/requests.service";

/**
 * @class ClientOrderTrackingResolver
 * @description The resolver for the order tracking
 */
@Injectable()
export class ClientOrderTrackingResolver implements Resolve<ReportTrip> {
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

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ReportTrip> {
    this.loadingService.startLoading();
    const trips = await this.requestsService.getItemTrackingInformation(<RequestTableElementRequest>route.queryParams);
    this.loadingService.endLoading();
    return trips;
  }
}