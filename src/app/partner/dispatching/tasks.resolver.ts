import { Injectable } from "@angular/core";
import { GhTasksResolver } from "../../misc/base-class/base-get-tasks.resolver";
import { CountryUtil } from "../../misc/util/country.util";
import { ReportTrip } from "../../api/requests/requests.type";

/**
 * @class PartnerTasksResolver
 * @description The resolver for the partner tasks
 */
@Injectable()
export class PartnerTasksResolver extends GhTasksResolver {
    /** @inheritdoc */
    override isUserAllowed = async (trip: ReportTrip) => {
        const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
        return CountryUtil.getSuccursaleByAirportCode(trip.userAirport) === succursale;
    }
}