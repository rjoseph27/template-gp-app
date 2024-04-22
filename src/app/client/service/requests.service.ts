import { Injectable, inject } from "@angular/core";
import { RequestsServiceApi } from "../../api/requests/requests.service.api";
import { OrderDetailRequest, CancelOrderStatus, ConfirmItemRequest, CreateAlertRequest, CreateAlertStatus, ItemsOrdersStatus, ReportTrip, ReportTripStatus, RequestTableElementRequest, SendItemsStatus, GpAcceptOrderStatus, GetReportTripStatus, GetTripInfoStatus, CancelTripStatus, AlertListStatus, AlertFormType, EditAlertStatus, DeleteAlertStatus, OrderFilterInfo, EditItemInformationRequest, EditItemInformationStatus, UpdateStatus, BillingFilterInfo, BillingStatus, CreateBillStatus, ConfirmTripRequest, ConfirmTripStatus, AddHistoryStatus, GetTasksStatus, EditItineraryStatus, CreateBill } from "../../api/requests/requests.type";
import { SendItemsRequest } from "./send-items.service";
import { DateUtil } from "../../misc/util/date.util";
import { UsersService } from "../../services/users.service";
import { StringKeys } from "../../api/base.service.api";
import { RequestTableElement } from "../../core/layouts/orders/orders.component";
import { OrderDetails } from "../../core/layouts/order-details/order-details.component";
import { AlertTableElement } from "../../core/layouts/alert-table/alert-table.component";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { TrackingPoint } from "../../core/layouts/tracking/tracking.type";
import { Tasks } from "../../misc/base-class/base-get-tasks.resolver";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { GhFile } from "../../core/elements/input/upload-image/upload-image.component";

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
     * @description The firebase storage
     * @type {AngularFireStorage}
     */
    private readonly fireStorage = inject(AngularFireStorage);

    /**
     * @description A method to upload image in the firebase storage
     * @param image The image to upload
     * @returns {Promise<String>}
     */
    private async uploadImage(image: File): Promise<string> {
        const filename = Date.now().toString();
        const filePath = `items/${filename}`;
        await this.fireStorage.upload(filePath, image);
        return filename;
    }

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
     * @returns {Promise<boolean>}
     */
    sendItems(confirmItemRequest: ConfirmItemRequest): Promise<boolean> {
        let id: string;
        
        for(let i = 0; i< confirmItemRequest.items.itemInformation.length; i++) {
            if((<GhFile>confirmItemRequest.items.itemInformation[0].image).tempUrl) {
                delete (<GhFile>confirmItemRequest.items.itemInformation[0].image).tempUrl
            }
        }
        
        return this.requestsServiceApi.sendItems(confirmItemRequest).then(async msg => {
            if(msg.message === SendItemsStatus.ITEMS_SENT_SUCCESSFULLY)
            {
                const imgList = confirmItemRequest.items.itemInformation
                    .filter(item => typeof item.image !== 'string')
                    .map(async (item) => {
                        id = msg.newId
                        return await this.uploadImage(item.image).then(async img => img)
                })
                
                if(imgList.length) {
                    Promise.all(imgList).then(async (x) => {
                        await this.requestsServiceApi.updateImageName({id: msg.newId, filenames: x })
                    });
                }
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
        return this.requestsServiceApi.createAlert({...createAlertRequest, userId: this.usersService.currentUserId}).then(async msg => {
            if(msg.message === CreateAlertStatus.ALERT_CREATED_SUCCESSFULLY)
            {
                const imgList = createAlertRequest.items.itemInformation.map(async (item) =>{
                    if(typeof item.image !== 'string')
                    {
                        return await this.uploadImage(item.image).then(async img => img);
                    }
                    return undefined
                })
                
                Promise.all(imgList).then(async (x) => {
                    await this.requestsServiceApi.updateImageName({id: msg.newId, filenames: x})
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
        return this.requestsServiceApi.editAlert(alert).then(async msg => {
            if(msg.message === EditAlertStatus.ALERT_EDITED_SUCCESSFULLY)
            {
                const imgList = alert.items.itemInformation
                    .filter(item => typeof item.image !== 'string')
                    .map(async (item) =>{
                        const formData = new FormData();
                        formData.append('image', item.image);
                        return await this.uploadImage(item.image).then(async img => img);
                    })
                
                Promise.all(imgList).then(async (x) => {
                    await this.requestsServiceApi.updateImageName({id: alert.itemId, filenames: x})
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

    /**
     * @description Filters the orders for a gp
     * @param orderFilter The order filter
     * @returns {Promise<OrderFilterInfo[]>} A promise that resolves to the orders
     */
    orderFilterForGp(orderFilter: OrderFilter): Promise<OrderFilterInfo[]> {
        return this.requestsServiceApi.orderFilterForGp(orderFilter).then(msg => msg.orders);
    }

    /**
     * @description Filters the trips
     * @param orderFilter The order filter
     * @returns {Promise<OrderFilterInfo[]>} A promise that resolves to the trips
     */
    filterTrip(orderFilter: OrderFilter): Promise<OrderFilterInfo[]> {
        return this.requestsServiceApi.filterTrip(orderFilter).then(msg => msg.orders);
    }

    /**
     * @description Edits the item information
     * @param editItemInformationRequest The edit item information request
     * @returns {Promise<boolean>} A promise that resolves to true if the item information was edited successfully, false otherwise
     */
    editItemInformation(editItemInformationRequest: EditItemInformationRequest): Promise<EditItemInformationStatus> {
        return this.requestsServiceApi.editItemInformation(editItemInformationRequest).then(msg => {
            return msg.message as EditItemInformationStatus
        });
    }

    /**
     * @description Cancels an order by a partner
     * @param cancelRequest The cancel request
     * @returns {Promise<boolean>} A promise that resolves to true if the order was canceled successfully, false otherwise
     */
    partnerCancelOrder(cancelRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.partnerCancelOrder(cancelRequest).then(msg => {
            if(msg.message === CancelOrderStatus.ORDER_CANCELED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Confirms an order by a partner
     * @param statusUpdateRequest the status update request
     * @returns {Promise<boolean>}
     */
    orderWaitOnPayment(statusUpdateRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.orderWaitOnPayment(statusUpdateRequest).then(msg => {
            if(msg.message === UpdateStatus.ORDER_STATUS_UPDATED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Confirms an order by a partner that the item is now with the gp
     * @param statusUpdateRequest the status update request
     * @returns {Promise<boolean>}
     */
    orderWithGp(statusUpdateRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.orderWithGp(statusUpdateRequest).then(msg => {
            if(msg.message === UpdateStatus.ORDER_STATUS_UPDATED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Fetches billing by email
     * @param email The email to search
     * @returns {Promise<BillingFilterInfo[]>}
     */
    findBillingByEmail(email: string): Promise<BillingFilterInfo[]> {
        return this.requestsServiceApi.findBillingByEmail(email).then(msg => {
            if(msg.message === BillingStatus.BILLING_FOUND) {
                return msg.billings;
            } 
            return [];
        });
    }

    /**
     * @description Fetches paysheet by email
     * @param email The email to search
     * @returns {Promise<BillingFilterInfo[]>}
     */
    findPaysheetByEmail(email: string): Promise<BillingFilterInfo[]> {
        return this.requestsServiceApi.findPaysheetByEmail(email).then(msg => {
            if(msg.message === BillingStatus.BILLING_FOUND) {
                return msg.billings;
            } 
            return [];
        });
    }

    /**
     * @description Creates a bill
     * @param billing The billing to create
     * @returns {Promise<boolean>} A promise that resolves to true if the bill was created successfully, false otherwise
     */
    createBill(createBill: CreateBill): Promise<boolean> {
        return this.requestsServiceApi.createBill(createBill).then(msg => {
            if(msg.message === CreateBillStatus.BILL_CREATED_SUCCESSFULLY) {
                return true;
            } 
            return false;
        });
    }

    /**
     * @description Creates a paysheet
     * @param createBill The paysheet to create
     * @returns {Promise<boolean>} A promise that resolves to true if the paysheet was created successfully, false otherwise
     */
    createPaysheet(createBill: CreateBill): Promise<boolean> {
        return this.requestsServiceApi.createPaysheet(createBill).then(msg => {
            if(msg.message === CreateBillStatus.BILL_CREATED_SUCCESSFULLY) {
                return true;
            } 
            return false;
        });
    }

    /**
     * @description Gets the item tracking information
     * @param request The request table element
     * @returns {Promise<ReportTrip>}
     */
    getItemTrackingInformation(request: RequestTableElementRequest): Promise<ReportTrip> {
        return this.requestsServiceApi.getItemTrackingInformation(request).then(msg => {
            if(msg.message === GetTripInfoStatus.TRIP_FOUND) {
                return msg.trip;
            }
            return undefined;
        });
    }

    /**
     * @description Confirms a trip
     * @param confirmTripRequest The confirm trip request
     * @returns {Promise<boolean>} A promise that resolves to true if the trip was confirmed successfully, false otherwise
     */
    confirmTrip(confirmTripRequest: ConfirmTripRequest): Promise<boolean> {
        return this.requestsServiceApi.confirmTrip(confirmTripRequest).then(msg => {
            if(msg.message === ConfirmTripStatus.TRIP_CONFIRMED_SUCCESSFULLY) {
                return true;
            }
            return false;
        });
    }

    /**
     * @description Adds a history
     * @param history The history to add
     * @returns {Promise<boolean>} A promise that resolves to true if the history was added successfully, false otherwise
     */
    addHistory(history: TrackingPoint): Promise<boolean> {
        return this.requestsServiceApi.addHistory(history).then(msg => {
            if(msg.message === AddHistoryStatus.HISTORY_ADDED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Gets the tasks for a trip
     * @param tripId The id of the trip of the taks
     * @returns {Promise<Tasks[]>}
     */
    getTasks(tripId: string): Promise<Tasks[]> {
        return this.requestsServiceApi.getTasks(tripId).then(msg => {
            if(msg.message === GetTasksStatus.TASKS_FOUND)
            {
                return msg.tasks
            }
            return null
        })
    }

    /**
     * @description Edits the trip itinerary
     * @param newItinerary The new itinerary
     * @returns {Promise<boolean>}
     */
    editTripItinerary(newItinerary: ReportTrip): Promise<boolean> {
        return this.requestsServiceApi.editTripItinerary(newItinerary).then(msg => {
            if(msg.message === EditItineraryStatus.ITINERARY_EDITED_SUCCESSFULLY)
            {
                return true
            }
            return false
        })
    }

    /**
     * @description Receives an item
     * @param statusUpdateRequest The status update request
     * @returns {Promise<boolean>}
     */
    receiveItem(statusUpdateRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.receiveItem(statusUpdateRequest).then(msg => {
            if(msg.message === UpdateStatus.ORDER_STATUS_UPDATED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Redirects items
     * @param redirectItemsRequest The redirect items request
     * @returns {Promise<boolean>}
     */
    redirectItems(redirectItemsRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.redirectItems(redirectItemsRequest).then(msg => {
            if(msg.message === UpdateStatus.ORDER_STATUS_UPDATED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }

    /**
     * @description Gets the commission
     * @param orderFilter The order filter
     * @returns {Promise<OrderFilterInfo[]>}
     */
    commission(orderFilter: OrderFilter): Promise<OrderFilterInfo[]> {
        return this.requestsServiceApi.commission(orderFilter).then(msg => msg.orders);
    }

    /**
     * @description Receives a commission
     * @param statusUpdateRequest the status update request
     * @returns {Promise<boolean>}
     */
    receiveCommission(statusUpdateRequest: OrderDetailRequest): Promise<boolean> {
        return this.requestsServiceApi.receiveCommission(statusUpdateRequest).then(msg => {
            if(msg.message === UpdateStatus.ORDER_STATUS_UPDATED_SUCCESSFULLY)
            {
                return true
            }
            return false
        });
    }
}