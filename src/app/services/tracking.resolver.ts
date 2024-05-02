import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ReportTrip, RequestTableElementRequest } from "../api/requests/requests.type";
import { LoadingService } from "./loading.service";
import { ClientRequestsService } from "../client/service/requests.service";

/**
 * @class TrackingResolver
 * @description The resolver for the order tracking
 */
@Injectable()
export class TrackingResolver implements Resolve<ReportTrip> {
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
    const trips = (<any>route.queryParams).status ? 
      await this.requestsService.getItemTrackingInformation(<RequestTableElementRequest>route.queryParams) : 
      this.requestsService.getTripInfo((<any>route.queryParams).id);
    this.loadingService.endLoading();
    return trips;
  }
}