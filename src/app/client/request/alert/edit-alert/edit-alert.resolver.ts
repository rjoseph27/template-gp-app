import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CreateAlertRequest } from "../../../../api/requests/requests.type";
import { Injectable, inject } from "@angular/core";
import { LoadingService } from "../../../../services/loading.service";
import { ClientRequestsService } from "../../../service/requests.service";
import { DateUtil } from "../../../../misc/util/date.util";

/**
 * @interface AlertParams
 * @description The alert params
 */
export interface AlertParams {
    /**
     * @description The id of the alert
     * @type {string}
     */
    id: string;
}

/**
 * @class ClientEditAlertResolver
 * @description The resolver for the edit alert
 */
@Injectable()
export class ClientEditAlertResolver implements Resolve<CreateAlertRequest> {
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
async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<CreateAlertRequest> {
    this.loadingService.startLoading();
    const alert = await this.requestsService.getAlert((<AlertParams>route.queryParams).id);
    this.loadingService.endLoading();
    return {
            ...alert, 
            alertId: (<AlertParams>route.queryParams).id,
            from: DateUtil.formatFromDatePicker(alert.timeRange.from),
            to: DateUtil.formatFromDatePicker(alert.timeRange.to),
    }
}
}