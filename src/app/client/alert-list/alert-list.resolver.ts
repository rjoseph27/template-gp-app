import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { LoadingService } from "../../services/loading.service";
import { ClientRequestsService } from "../service/requests.service";
import { AlertTableElement } from "../../core/layouts/alert-table/alert-table.component";

/**
 * @class ClientAlertListResolver
 * @description The resolver for the alert list
 */
@Injectable()
export class ClientAlertListResolver implements Resolve<AlertTableElement[]> {
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
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AlertTableElement[]> {
    this.loadingService.startLoading();
    const alerts = await this.requestsService.getAlertByUserId();
    this.loadingService.endLoading();
    return alerts || [];
  }
}