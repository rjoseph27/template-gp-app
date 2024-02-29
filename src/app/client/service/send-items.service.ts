import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ItemCategory } from "../../misc/enums/item-category.enum";
import { Country } from "../../misc/enums/country.enum";

/**
 * @interface SendItemsRequest
 * @description The send items request
 */
interface SendItemsRequest {
    /**
     * @description The user id
     * @type {string}
     */
    userId: string;

    /**
     * @description The user country
     * @type {Country}
     */
    userCountry: Country;

    /**
     * @description The user region
     * @type {any}
     */
    userRegion: any;

    /**
     * @description The destination country
     * @type {Country}
     */
    destinationCountry: Country,

    /**
     * @description The destination region
     * @type {any}
     */
    destinationRegion: any;

    /**
     * @description The consignee full name
     * @type {string}
     */
    consigneeFullName: string;

    /**
     * @description The consignee address
     * @type {string}
     */
    consigneeAddress: string;

    /**
     * @description The consignee phone number
     * @type {string}
     */
    consigneePhoneNumber: string;

    /**
     * @description The item information
     * @type {ItemCategory[]}
     */
    itemInformation: ItemCategory[];
}

/**
 * @class SendItemsService
 * @description The send items service
 */
@Injectable()
export class ClientSendItemsService {
    /**
     * @description The backing field for the requests
     * @type {BehaviorSubject<SendItemsRequest[]>}
     */
    private readonly _requests$ = new BehaviorSubject<SendItemsRequest>(undefined);

    /**
     * @description The requests
     * @type {SendItemsRequest}
     */
    set requests(value: SendItemsRequest) {
        this._requests$.next(value);
    }
    get requests(): SendItemsRequest {
        return this._requests$.value;
    }
}