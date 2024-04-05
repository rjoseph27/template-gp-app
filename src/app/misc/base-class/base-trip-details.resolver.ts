import { Injectable, inject } from "@angular/core";
import { LoadingService } from "../../services/loading.service";
import { ClientRequestsService } from "../../client/service/requests.service";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ReportTrip } from "../../api/requests/requests.type";
import { ClientRoutes } from "../../client/client.route";
import { UsersService } from "../../services/users.service";
import { NavigationService } from "../../services/navigation.service";

/**
 * @class GhTripInfoResolver
 * @description The resolver for the trip info
 */
@Injectable()
export abstract class GhTripInfoResolver implements Resolve<ReportTrip> {
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
  * @description The users service
  * @type {UsersService}
  */
  protected readonly userService: UsersService = inject(UsersService);

  /**
   * @description The navigation service
   * @type {NavigationService}
   */
  private readonly navigationService: NavigationService = inject(NavigationService);

  /**
   * @description A function that checks if the user is allowed to see the trip details
   * @type {(trip: ReportTrip) => Promise<boolean>}
   */
  abstract isUserAllowed: (trip :ReportTrip) => Promise<boolean>;


  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ReportTrip> {
    this.loadingService.startLoading();
    const tripInfo = await this.requestsService.getTripInfo((<any>route.queryParams).id);
    if(!this.isUserAllowed(tripInfo)) {
      this.navigationService.redirectToMainPage()
      this.loadingService.endLoading();
      return undefined;
    }
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