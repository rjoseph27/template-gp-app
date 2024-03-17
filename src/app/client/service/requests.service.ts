import { Injectable, inject } from "@angular/core";
import { RequestsServiceApi } from "../../api/requests/requests.service.api";
import { OrderDetailRequest, CancelOrderStatus, ConfirmItemRequest, CreateAlertRequest, CreateAlertStatus, ItemsOrdersStatus, ReportTrip, ReportTripStatus, RequestTableElementRequest, SendItemsStatus, GpAcceptOrderStatus, GetReportTripStatus, GetTripInfoStatus, CancelTripStatus, AlertListStatus, AlertFormType, EditAlertStatus, DeleteAlertStatus, OrderFilterInfo } from "../../api/requests/requests.type";
import { SendItemsRequest } from "./send-items.service";
import { DateUtil } from "../../misc/util/date.util";
import { UsersService } from "../../services/users.service";
import { StringKeys } from "../../api/base.service.api";
import { RequestTableElement } from "../../core/layouts/orders/orders.component";
import { OrderDetails } from "../../core/layouts/order-details/order-details.component";
import { AlertTableElement } from "../../core/layouts/alert-table/alert-table.component";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";

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
     * @description The user service
     * @type {UsersService}
     */
    private readonly usersService = inject(UsersService);

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

    /**
     * @description Searches trips
     * @param searchTrips The search trips request
     * @returns {Promise<ReportTrip>} A promise that resolves to the trips found
     */
    searchTrips(searchTrips: SendItemsRequest, month?: Date): Promise<StringKeys<ReportTrip>[]> {
        return this.requestsServiceApi.searchTrips({
            userId: this.usersService.currentUserId,
            userCountry: searchTrips.userCountry,
            userRegion: searchTrips.userRegion,
            destinationCountry: searchTrips.destinationCountry,
            destinationRegion: searchTrips.destinationRegion,
            itemInformation: searchTrips.itemInformation.map(item => ({
                id: item.id?.toString(),
                status: item.status,
                itemCategory: item.itemCategory, 
                itemWeight: item.itemWeight, 
                itemQuantity: item.itemQuantity})),
            month: month !== undefined ? month : DateUtil.addDaysFromDate(new Date(),1),
        }).then(msg => msg.searchResults);
    }

    /**
     * @description Sends items
     * @param confirmItemRequest The confirm item request
     * @returns {Promise<string>}
     */
    sendItems(confirmItemRequest: ConfirmItemRequest): Promise<string> {
        let id: string;
        return this.requestsServiceApi.sendItems(confirmItemRequest).then(async msg => {
            if(msg.message === SendItemsStatus.ITEMS_SENT_SUCCESSFULLY)
            {
                confirmItemRequest.items.itemInformation.forEach(async (item,index) =>{
                    if(typeof item.image !== 'string')
                    {
                        const formData = new FormData();
                        formData.append('image', item.image);
                        id = msg.newId 
                        await this.requestsServiceApi.uploadImages(formData).then(async img => await this.requestsServiceApi.updateImageName({id: msg.newId, filename: img, index: index}));
                    }
                });
                return id
            }
            return undefined
        });
    }

    /**
     * @description Creates an alert
     * @param createAlertRequest The create alert request
     * @returns {Promise<boolean>} A promise that resolves to true if the alert was created successfully, false otherwise
     */
    createAlert(createAlertRequest: CreateAlertRequest): Promise<boolean> {
        return this.requestsServiceApi.createAlert({...createAlertRequest, userId: this.usersService.currentUserId}).then(msg => {
            if(msg.message === CreateAlertStatus.ALERT_CREATED_SUCCESSFULLY)
            {
                createAlertRequest.items.itemInformation.forEach(async (item,index) =>{
                    const formData = new FormData();
                    formData.append('image', item.image); 
                    await this.requestsServiceApi.uploadImages(formData).then(async img => await this.requestsServiceApi.updateImageName({id: msg.newId, filename: img, index: index}));
                });
                return true
            }
            return false
        });
    }
    
    /**
     * @description Gets the items orders for a user
     * @param userId The id of the user
     * @returns {Promise<RequestTableElement[]>} A promise that resolves to the items orders
     */
    getItemsOrders(userId: string): Promise<RequestTableElement[]> {
        return this.requestsServiceApi.getItemsOrders(userId).then(msg => {
            if(ItemsOrdersStatus.ITEMS_FOUND) {
                return msg.orders || [];
            } else {
                return [];
            }
        })        
    }

    /**
     * @description Gets the item information
     * @param request The request table element
     * @returns {Promise<OrderDetails>}
     */
    getItemInformation(request: RequestTableElementRequest): Promise<OrderDetails> {
        return this.requestsServiceApi.getItemInformation(request).then(msg => msg.order);
    }

    /**
     * @description Cancels an order
     * @param clientCancelRequest The client cancel request
     * @returns {Promise<boolean>} A promise that resolves to true if the order was canceled successfully, false otherwise
     */
    clientCancelOrder(clientCancelRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.clientCancelOrder(clientCancelRequest).then(msg => {
            if(msg.message === CancelOrderStatus.ORDER_CANCELED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Gets the items orders for a user
     * @param userId The id of the user
     * @returns {Promise<RequestTableElement[]>} A promise that resolves to the items orders
     */
    getItemsOrdersForGp(userId: string): Promise<RequestTableElement[]> {
        return this.requestsServiceApi.getItemsOrdersForGp(userId).then(msg => {
            if(msg.message === ItemsOrdersStatus.ITEMS_FOUND) {
                return msg.orders || [];
            } else {
                return [];
            }
        })        
    }

    /**
     * @description Cancels an order
     * @param clientCancelRequest The client cancel request
     * @returns {Promise<boolean>} A promise that resolves to true if the order was canceled successfully, false otherwise
     */
    gpCancelOrder(clientCancelRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.gpCancelOrder(clientCancelRequest).then(msg => {
            if(msg.message === CancelOrderStatus.ORDER_CANCELED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Accepts an order
     * @param clientAcceptRequest The client accept request
     * @returns {Promise<boolean>} A promise that resolves to true if the order was accepted successfully, false otherwise
     */
    gpAcceptOrder(clientAcceptRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.gpAcceptOrder(clientAcceptRequest).then(msg => {
            if(msg.message === GpAcceptOrderStatus.ORDER_ACCEPTED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Gets the send items info
     * @param sendItemId The id of the send items
     * @returns {Promise<SendItemsRequest>} A promise that resolves to the send items info
     */
    getSendItemsInfo(sendItemId: string): Promise<SendItemsRequest> {
        return this.requestsServiceApi.getSendItemsInfo(sendItemId).then(msg => {
            if(msg.message === ItemsOrdersStatus.ITEMS_FOUND) {
                return msg.sendItemRequest;
            }
            return undefined;
        })        
    }

    /**
     * @description Gets the trip list
     * @param userId The id of the user
     * @returns {Promise<ReportTrip[]>} A promise that resolves to the trip list
     */
    getTripList(userId: string): Promise<RequestTableElement[]> {
        return this.requestsServiceApi.getTripList(userId).then(msg => {
            if(msg.message === GetReportTripStatus.TRIPS_FOUND) {
                return msg.trips;
            }
            return [];
        })        
    }

    /**
     * @description Gets the trip info
     * @param tripId The trip id
     * @returns {Promise<ReportTrip>} A promise that resolves to the trip info
     */
    getTripInfo(tripId: string): Promise<ReportTrip> {
        return this.requestsServiceApi.getTripInfo(tripId).then(msg => {
            if(msg.message === GetTripInfoStatus.TRIP_FOUND) {
                return msg.trip;
            }
            return undefined;
        });
    }

    /**
     * @description Cancels a trip
     * @param tripId The trip id
     * @returns {Promise<boolean>} A promise that resolves to true if the trip was canceled successfully, false otherwise
     */
    cancelTrip(tripId: string): Promise<boolean> {
        return this.requestsServiceApi.gpCancelTrip({tripId}).then(msg => {
            if(msg.message === CancelTripStatus.TRIP_CANCELED_SUCCESSFULLY) {
                return true;
            }
            return false;
        });
    }

    /**
     * @description Gets the alerts of a user
     * @param userId The id of the user
     * @returns {Promise<AlertTableElement[]>} A promise that resolves to the alerts
     */
    getAlertByUserId(userId?: string): Promise<AlertTableElement[]> {
        return this.requestsServiceApi.getAlertByUserId(userId || this.usersService.currentUserId).then(msg => {
            if(msg.message === AlertListStatus.ALERTS_FOUND) {
                return msg.alerts || [];
            }
            return [];
        })        
    }

    /**
     * @description Gets the alert
     * @param alertId The id of the alert
     * @returns {Promise<AlertTableElement>}
     */
    getAlert(alertId: string): Promise<AlertTableElement> {
        return this.requestsServiceApi.getAlert(alertId).then(msg => {
            if(msg.message === AlertListStatus.ALERTS_FOUND) {
                return msg.alert;
            }
            return undefined;
        })        
    }

    /**
     * @description Edit an alert
     * @param alert The alert to edit
     * @returns 
     */
    editAlert(alert: CreateAlertRequest): Promise<boolean> {
        return this.requestsServiceApi.editAlert(alert).then(msg => {
            if(msg.message === EditAlertStatus.ALERT_EDITED_SUCCESSFULLY)
            {
                alert.items.itemInformation.forEach(async (item,index) =>{
                    if(typeof item.image !== 'string' && item.image.type) {
                        const formData = new FormData();
                        formData.append('image', item.image); 
                        await this.requestsServiceApi.uploadImages(formData).then(async img => await this.requestsServiceApi.updateImageName({id: alert.itemId, filename: img, index: index}));
                    }
                });
                return true
            }
            return false
        });
    }

    /**
     * @description Deletes an alert
     * @param alertId The id of the alert
     * @returns {Promise<boolean>} A promise that resolves to true if the alert was deleted successfully, false otherwise
     */
    deleteAlert(alertId: CreateAlertRequest): Promise<boolean> {
        return this.requestsServiceApi.deleteAlert(alertId).then(msg => {
            if(msg.message === DeleteAlertStatus.ALERT_DELETED_SUCCESSFULLY) {
                return true;
            }
            return false;
        });
    }

    /**
     * @description Filters the orders
     * @param orderFilter The order filter
     * @returns {Promise<OrderFilterInfo[]>} A promise that resolves to the orders
     */
    orderFilter(orderFilter: OrderFilter): Promise<OrderFilterInfo[]> {
        return this.requestsServiceApi.orderFilter(orderFilter).then(msg => msg.orders);
    }
}