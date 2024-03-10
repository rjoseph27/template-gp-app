import { Injectable, inject } from "@angular/core";
import { RequestsServiceApi } from "../../api/requests/requests.service.api";
import { OrderDetailRequest, CancelOrderStatus, ConfirmItemRequest, CreateAlertRequest, CreateAlertStatus, ItemsOrdersStatus, ReportTrip, ReportTripStatus, RequestTableElementRequest, SendItemsStatus, GpAcceptOrderStatus } from "../../api/requests/requests.type";
import { SendItemsRequest } from "./send-items.service";
import { DateUtil } from "../../misc/util/date.util";
import { UsersService } from "../../services/users.service";
import { StringKeys } from "../../api/base.service.api";
import { RequestTableElement } from "../../core/layouts/orders/orders.component";
import { OrderDetails } from "../../core/layouts/order-details/order-details.component";

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
            itemInformation: searchTrips.itemInformation.map(item => ({itemCategory: item.itemCategory, itemWeight: item.itemWeight, itemQuantity: item.itemQuantity})),
            month: month !== undefined ? month : DateUtil.addDaysFromDate(new Date(),1),
        }).then(msg => msg.searchResults);
    }

    /**
     * @description Sends items
     * @param confirmItemRequest The confirm item request
     * @returns {Promise<boolean>} A promise that resolves to true if the items were sent successfully, false otherwise
     */
    sendItems(confirmItemRequest: ConfirmItemRequest): Promise<boolean> {
        return this.requestsServiceApi.sendItems(confirmItemRequest).then(async msg => {
            if(msg.message === SendItemsStatus.ITEMS_SENT_SUCCESSFULLY)
            {
                confirmItemRequest.items.itemInformation.forEach(async (item,index) =>{
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
     * @description Creates an alert
     * @param createAlertRequest The create alert request
     * @returns {Promise<boolean>} A promise that resolves to true if the alert was created successfully, false otherwise
     */
    createAlert(createAlertRequest: CreateAlertRequest): Promise<boolean> {
        return this.requestsServiceApi.createAlert({...createAlertRequest}).then(msg => {
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
            if(ItemsOrdersStatus.ITEMS_FOUND) {
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
}