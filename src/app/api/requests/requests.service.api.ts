import { Injectable } from "@angular/core";
import { ApiResponse, BaseServiceApi } from "../base.service.api";
import { firstValue } from "../../misc/function/firstValue";
import { ReportTrip, SearchTripsRequest, SearchTripsApiResponse, ConfirmItemRequest, SendItemsRequestApiResponse, UpdateImageNameRequest } from "./requests.type";

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

    /**
     * @description A method that searches trips
     * @param searchTrips The search trips request
     * @returns {Promise<ApiResponse>}
     */
    searchTrips(searchTrips: SearchTripsRequest): Promise<SearchTripsApiResponse> {
        return firstValue(this.postRequest<SearchTripsApiResponse>('search-trips', searchTrips));
    }

    /**
     * @description A method that sends items
     * @param confirmItemRequest The confirm item request
     * @returns {Promise<ApiResponse>}
     */
    sendItems(confirmItemRequest: ConfirmItemRequest): Promise<SendItemsRequestApiResponse> {
        return firstValue(this.postRequest<SendItemsRequestApiResponse>('send-items', confirmItemRequest));
    }

    /**
     * @description A method that uploads images
     * @param image The image
     * @returns {Promise<string>}
     */
    uploadImages(image: FormData): Promise<string> {
        return firstValue(this.postRequest<string>('upload-image', image));
    }

    /**
     * @description A method that updates the image name
     * @param imageUpdateInfo The update image name request 
     * @returns {Promise<ApiResponse>}
     */
    updateImageName(imageUpdateInfo: UpdateImageNameRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('update-image-name', imageUpdateInfo));
    }
}