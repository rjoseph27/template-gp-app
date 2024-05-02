import { Injectable } from "@angular/core";
import { GhTasksResolver } from "../../../../misc/base-class/base-get-tasks.resolver";
import { ReportTrip, RequestTableElementRequest } from "../../../../api/requests/requests.type";
import { Params } from "@angular/router";

/**
 * @class ClientTasksResolver
 * @description The resolver for the gp tasks
 */
@Injectable()
export class ClientTasksResolver extends GhTasksResolver {
    /** @inheritdoc */
    override getTripInfo = (params: Params) => {
        if((<any>params).status) {
            return this.requestsService.getItemTrackingInformation(<any>params)
        } else {
            return this.requestsService.getTripInfo((<any>params).id);
        }
    };
    
    /** @inheritdoc */
    override isUserAllowed = async (trip: ReportTrip): Promise<boolean> => trip.userId !== this.userService.currentUserId;
}