import { Injectable, inject } from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import { ClientRequestsService } from "../../service/requests.service";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ReportTrip } from "../../../api/requests/requests.type";
import { ClientRoutes } from "../../../client.route";

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
 * @class ClientTripInfoResolver
 * @description The client trip info resolver
 */
@Injectable()
export class ClientTripInfoResolver implements Resolve<ReportTrip> {
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