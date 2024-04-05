import { Injectable } from "@angular/core";
import { ReportTrip } from "../../../api/requests/requests.type";
import { GhTripInfoResolver } from "../../../misc/base-class/base-trip-details.resolver";

/**
 * @class ClientTripInfoResovler
 * @description The resolver for the client trip info
 */
@Injectable()
export class ClientTripInfoResovler extends GhTripInfoResolver {
    /** @inheritdoc */
    override isUserAllowed = async (trip: ReportTrip): Promise<boolean> => trip.userId !== this.userService.currentUserId;
}