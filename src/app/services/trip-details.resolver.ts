import { Injectable, inject } from "@angular/core";
import { LoadingService } from "./loading.service";
import { ClientRequestsService } from "../client/service/requests.service";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ReportTrip } from "../api/requests/requests.type";
import { ClientRoutes } from "../client/client.route";

/**
 * @interface TripInfoRequest
 * @description The trip info request
 */
interface TripInfoRequest {
    /**
     * @description The id of the request
     * @type {string}
     */
    id: string;
}

/**
 * @class GhTripInfoResolver
 * @description The resolver for the trip info
 */
@Injectable()
export class GhTripInfoResolver implements Resolve<ReportTrip> {
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


  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ReportTrip> {
    this.loadingService.startLoading();
    const tripInfo = await this.requestsService.getTripInfo((<TripInfoRequest>route.queryParams).id);
    if(tripInfo) {
      this.loadingService.endLoading();
      return tripInfo;
    } else {
      this.router.navigate([ClientRoutes.tripList.fullPath()]); 
      this.loadingService.endLoading();
      return undefined;
    }
  }
}