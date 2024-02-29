import { Injectable, inject } from "@angular/core";
import { RequestsServiceApi } from "../../api/requests/requests.service.api";
import { ReportTrip, ReportTripStatus } from "../../api/requests/requests.type";


@Injectable()
export class RequestsService {
    /**
     * @description The requests service api
     * @type {RequestsServiceApi}
     */
    private readonly requestsServiceApi: RequestsServiceApi = inject(RequestsServiceApi);

    /**
     * @description Reports a trip
     * @param reportTrip The report trip request
     * @returns 
     */
    reportTrip(reportTrip: ReportTrip): any {
        return this.requestsServiceApi.reportTrip(reportTrip).then(msg => {
            if(msg.message === ReportTripStatus.TRIP_REPORTED_SUCCESSFULLY)
            {
                console.log("TODO: Handle success")
            }
        });
    }
}