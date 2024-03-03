import { Injectable, inject } from "@angular/core";
import { RequestsServiceApi } from "../../api/requests/requests.service.api";
import { ConfirmItemRequest, ReportTrip, ReportTripStatus, SendItemsStatus } from "../../api/requests/requests.type";
import { ItemInformation } from "../../core/layouts/request/item-information/item-information.component";
import { SendItemsRequest } from "./send-items.service";
import { DateUtil } from "../../misc/util/date.util";
import { UsersService } from "../../services/users.service";
import { StringKeys } from "../../api/base.service.api";


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
}