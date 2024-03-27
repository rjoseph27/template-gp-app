import { ReportTrip } from "../../api/requests/requests.type";
import { CountryUtil } from "../../misc/util/country.util";
import { GhTripInfoResolver } from "../../services/trip-details.resolver";

/**
 * @class PartnerTripInfoResovler
 * @description The resolver for the partner trip info
 */
export class PartnerTripInfoResovler extends GhTripInfoResolver {
    /** @inheritdoc */
    override isUserAllowed = async (trip: ReportTrip) => {
        const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
        return CountryUtil.getSuccursaleByAirportCode(trip.userAirport) === succursale;
    }
}