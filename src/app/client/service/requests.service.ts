import { Injectable, inject } from "@angular/core";
import { RequestsServiceApi } from "../../api/requests/requests.service.api";
import { ReportTrip, ReportTripStatus } from "../../api/requests/requests.type";


/**
 * @class RequestsService
 * @description The requests service
 */
@Injectable()
export class ClientRequestsService {
    /**
     * @description The requests service api
     * @type {RequestsServiceApi}
     */
    private readonly requestsServiceApi: RequestsServiceApi = inject(RequestsServiceApi);

    /**
     * @description Reports a trip
     * @param reportTrip The report trip request
     * @returns {Promise<boolean>} A promise that resolves to true if the trip was reported successfully, false otherwise
     */
    reportTrip(reportTrip: ReportTrip): Promise<boolean> {
        return this.requestsServiceApi.reportTrip(reportTrip).then(msg => {
            if(msg.message === ReportTripStatus.TRIP_REPORTED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }
}