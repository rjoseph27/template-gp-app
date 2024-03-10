import { Injectable } from "@angular/core";
import { ApiResponse, BaseServiceApi } from "../base.service.api";
import { firstValue } from "../../misc/function/firstValue";
import { ReportTrip, SearchTripsRequest, SearchTripsApiResponse, ConfirmItemRequest, SendItemsRequestApiResponse, UpdateImageNameRequest, CreateAlertRequest, ListItemsApiResponse, ItemInformationApiResponse, RequestTableElementRequest, OrderDetailRequest } from "./requests.type";

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

    /**
     * @description A method that creates an alert
     * @param alertRequest The create alert request
     * @returns {Promise<ApiResponse>}
     */
    createAlert(alertRequest: CreateAlertRequest): Promise<SendItemsRequestApiResponse> {
        return firstValue(this.postRequest<SendItemsRequestApiResponse>('create-alert', alertRequest));
    }

    /**
     * @description A method that gets the items orders
     * @param userId The id of the user
     * @returns {Promise<ListItemsApiResponse>}
     */
    getItemsOrders(userId: string): Promise<ListItemsApiResponse> {
        return firstValue(this.getRequest<ListItemsApiResponse>('lists-items', userId));
    }

    /**
     * @description A method that gets the item information
     * @param request The request table element
     * @returns {Promise<ItemInformationApiResponse>}
     */
    getItemInformation(request: RequestTableElementRequest): Promise<ItemInformationApiResponse> {
        return firstValue(this.postRequest<ItemInformationApiResponse>('get-item-information', request));
    }

    /**
     * @description A method that cancels an order for a client
     * @param clientCancelRequest The client cancel request
     * @returns {Promise<ApiResponse>}
     */
    clientCancelOrder(clientCancelRequest: OrderDetailRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('client-cancel-order', clientCancelRequest));
    }

    /**
     * @description A method that gets the items orders for a user
     * @param userId The id of the user
     * @returns {Promise<ListItemsApiResponse>}
     */
    getItemsOrdersForGp(userId: string): Promise<ListItemsApiResponse> {
        return firstValue(this.getRequest<ListItemsApiResponse>('lists-gp-items', userId));
    }

    /**
     * @description A method that cancels an order for a GP
     * @param clientCancelRequest The client cancel request
     * @returns {Promise<ApiResponse>}
     */
    gpCancelOrder(clientCancelRequest: OrderDetailRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('gp-cancel-order', clientCancelRequest));
    }

    /**
     * @description A method that accepts an order for a GP
     * @param clientAcceptRequest The client accept request
     * @returns {Promise<ApiResponse>}
     */
    gpAcceptOrder(clientAcceptRequest: OrderDetailRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('gp-accept-order', clientAcceptRequest));
    }
}