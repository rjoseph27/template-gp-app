import { Injectable } from "@angular/core";
import { ApiResponse, BaseServiceApi } from "../base.service.api";
import { firstValue } from "../../misc/function/firstValue";
import { ReportTrip } from "./requests.type";

/**
 * @class RequestsServiceApi
 * @description The requests service api
 */
@Injectable()
export class RequestsServiceApi extends BaseServiceApi {
    /** @inheritdoc */
    override apiName: string = 'requests';

    /**
     * @description A method that reports a trip
     * @param reportTrip The report trip request
     * @returns {Promise<ApiResponse>}
     */
    reportTrip(reportTrip: ReportTrip): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('report-trip', reportTrip));
    }
}