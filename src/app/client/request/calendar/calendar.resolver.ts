import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { ClientSendItemsService } from "../../service/send-items.service";
import { Injectable, inject } from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import { ClientRoutes } from "../../../client.route";
import { DateUtil } from "../../../misc/util/date.util";

@Injectable()
export class ClientCalendarResolver implements Resolve<any> {
  /**
  * @description The loading service
  * @returns {LoadingService}
  */
  private readonly loadingService: LoadingService = inject(LoadingService)

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

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.loadingService.startLoading();
    if(this.sendItemsService.requests) {
            this.loadingService.endLoading();
            return {
                month: DateUtil.addDaysFromDate(new Date(),1).getMonth(),
            };
    } else {
        // this.router.navigate([ClientRoutes.sendItems.fullPath()]); UNCOMMENT LATER FOR DEVELOPMENT PURPOSES
        // delete later
        this.loadingService.endLoading();
        return {
            month: DateUtil.addDaysFromDate(new Date(),1).getMonth(),
        };
        //--------
        this.loadingService.endLoading();
        return undefined;
    }
  }
}