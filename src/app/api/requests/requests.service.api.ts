import { Injectable } from "@angular/core";
import { ApiResponse, BaseServiceApi } from "../base.service.api";
import { firstValue } from "../../misc/function/firstValue";
import { ReportTrip, SearchTripsRequest, SearchTripsApiResponse, ConfirmItemRequest, SendItemsRequestApiResponse, UpdateImageNameRequest, CreateAlertRequest, ListItemsApiResponse, ItemInformationApiResponse, RequestTableElementRequest, OrderDetailRequest, GetSendItemsRequestApiResponse, GetTripListApiResponse, GetTripInfoApiResponse, CancelTripRequest, AlertListApiResponse, AlertApiResponse, OrderFilterResponse, EditItemInformationRequest, BillingListApiResponse, BillingFilterInfo, ConfirmTripRequest, GetTasksApiResponse } from "./requests.type";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { TrackingPoint } from "../../core/layouts/tracking/tracking.type";

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

    /**
     * @description A method that gets the send items info
     * @param sendItemId The id of the send items
     * @returns {Promise<GetSendItemsRequestApiResponse>}
     */
    getSendItemsInfo(sendItemId: string): Promise<GetSendItemsRequestApiResponse> {
        return firstValue(this.getRequest<GetSendItemsRequestApiResponse>('get-send-items-info', sendItemId));
    }

    /**
     * @description A method that gets the trip list
     * @param userId The id of the user
     * @returns {Promise<GetTripListApiResponse>}
     */
    getTripList(userId: string): Promise<GetTripListApiResponse> {
        return firstValue(this.getRequest<GetTripListApiResponse>('lists-gp-trips', userId));
    }

    /**
     * @description A method that gets the trip info
     * @param tripId The trip id
     * @returns {Promise<GetTripInfoApiResponse>}
     */
    getTripInfo(tripInfo: string): Promise<GetTripInfoApiResponse> {
        return firstValue(this.getRequest<GetTripInfoApiResponse>('get-trip-info', tripInfo));
    }

    /**
     * @description A method that cancels a trip
     * @param cancelTripRequest The cancel trip request 
     * @returns {Promise<ApiResponse>}
     */
    gpCancelTrip(cancelTripRequest: CancelTripRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('gp-cancel-trip', cancelTripRequest));
    }

    /**
     * @description A method that gets all the alerts of a user
     * @param userId The id of the user
     * @returns {Promise<ApiResponse>}
     */
    getAlertByUserId(userId: string): Promise<AlertListApiResponse> {
        return firstValue(this.getRequest<AlertListApiResponse>('get-alert-by-userid', userId));
    }

    /**
     * @description A method to get an alert by id
     * @param alertId The id of the alert 
     * @returns {Promise<AlertApiResponse>}
     */
    getAlert(alertId: string): Promise<AlertApiResponse> {
        return firstValue(this.getRequest<AlertApiResponse>('get-alert', alertId));
    }

    /**
     * @description A method to edit an alert
     * @param alert The alert to edit
     * @returns {Promise<ApiResponse>}
     */
    editAlert(alert: CreateAlertRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('edit-alert', alert));
    }

    /**
     * @description A method to delete an alert
     * @param alertId The id of the alert
     * @returns {Promise<ApiResponse>}
     */
    deleteAlert(alertId: CreateAlertRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('delete-alert', alertId));
    }

    /**
     * @description A method to get the order filter
     * @param orderFilterRequest The order filter request
     * @returns {Promise<ApiResponse>}
     */
    orderFilter(orderFilterRequest: OrderFilter): Promise<OrderFilterResponse> {
        return firstValue(this.postRequest<OrderFilterResponse>('filter-order', orderFilterRequest));
    }

    /**
     * @description A method to get the order filter for a GP
     * @param orderFilterRequest The order filter request
     * @returns {Promise<ApiResponse>}
     */
    orderFilterForGp(orderFilterRequest: OrderFilter): Promise<OrderFilterResponse> {
        return firstValue(this.postRequest<OrderFilterResponse>('filter-order-for-gp', orderFilterRequest));
    }

    /**
     * @description A method to get the trip filter
     * @param orderFilterRequest The order filter request
     * @returns {Promise<ApiResponse>}
     */
    filterTrip(orderFilterRequest: OrderFilter): Promise<OrderFilterResponse> {
        return firstValue(this.postRequest<OrderFilterResponse>('filter-trip', orderFilterRequest));
    }

    /**
     * @description A method to edit the item information
     * @param editItemInformationRequest The edit item information request
     * @returns {Promise<ApiResponse>}
     */
    editItemInformation(editItemInformationRequest: EditItemInformationRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('edit-item-information', editItemInformationRequest));
    }

    /**
     * @description A method to cancel an order for a partner
     * @param partnerCancelRequest The partner cancel request
     * @returns {Promise<ApiResponse>}
     */
    partnerCancelOrder(partnerCancelRequest: OrderDetailRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('partner-cancel-order', partnerCancelRequest));
    }

    /**
     * @description A method to update the status of an order to wait on payment
     * @param updateStatusRequest The update status request
     * @returns {Promise<ApiResponse>}
     */
    orderWaitOnPayment(updateStatusRequest: OrderDetailRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('order-wait-on-payment', updateStatusRequest));
    }

    /**
     * @description A method to update the status of an order to with gp state
     * @param updateStatusRequest The update status request
     * @returns {Promise<ApiResponse>}
     */
    orderWithGp(updateStatusRequest: OrderDetailRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('order-with-gp', updateStatusRequest));
    }

    /**
     * @description A method to fetch the billing list by email
     * @param email The email to search
     * @returns {Promise<BillingListApiResponse>}
     */
    findBillingByEmail(email: string): Promise<BillingListApiResponse> {
        return firstValue(this.getRequest<BillingListApiResponse>('find-billing-by-email', email));
    }

    /**
     * @description A method to create a bill
     * @param orders The list of orders
     * @returns {Promise<ApiResponse>}
     */
    createBill(orders: BillingFilterInfo[]): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('create-bill', { orders: orders }));
    }

    /**
     * @description A method to get the item tracking information
     * @param request The request table element
     * @returns {Promise<GetTripInfoApiResponse>}
     */
    getItemTrackingInformation(request: RequestTableElementRequest): Promise<GetTripInfoApiResponse> {
        return firstValue(this.postRequest<GetTripInfoApiResponse>('get-item-tracking-information', request ));
    }

    /**
     * @description A method to confirm a trip
     * @param confirmTripRequest The confirm trip request
     * @returns {Promise<ApiResponse>}
     */
    confirmTrip(confirmTripRequest: ConfirmTripRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('confirm-trip', confirmTripRequest));
    }
    
    /**
     * @description A method to add a history to a trip
     * @param history The history to add
     * @returns {Promise<ApiResponse>}
     */
    addHistory(history: TrackingPoint): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('add-history', history));
    }

    /**
     * @description A method to get the tasks
     * @param tripInfo The trip info with the tasks
     * @returns {Promise<GetTasksApiResponse>}
     */
    getTasks(tripInfo: string): Promise<GetTasksApiResponse> {
        return firstValue(this.getRequest<GetTasksApiResponse>('get-tasks', tripInfo));
    }

    /**
     * @description A method to edit the trip itinerary
     * @param newItinerary The new itinerary
     * @returns {Promise<ApiResponse>}
     */
    editTripItinerary(newItinerary: ReportTrip): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('edit-itinerary', newItinerary));
    }

    /**
     * @description A method to receive an item
     * @param updateStatusRequest The update status request
     * @returns {Promise<ApiResponse>}
     */
    receiveItem(updateStatusRequest: OrderDetailRequest): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('receive-item', updateStatusRequest));
    }
}