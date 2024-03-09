import { SendItemsRequest } from "../../client/service/send-items.service"
import { TimeFromTimePicker } from "../../core/elements/input/time-field/time-field.component"
import { SpecificPrice } from "../../core/layouts/request/report-trip/report.time.constant"
import { RequestTableElement } from "../../core/layouts/orders/orders.component"
import { Country } from "../../misc/enums/country.enum"
import { Currency } from "../../misc/enums/currency.enum"
import { ItemCategory } from "../../misc/enums/item-category.enum"
import { DateFromDatePicker } from "../../misc/util/date.util"
import { ApiResponse, StringKeys } from "../base.service.api"
import { ItemsStatus } from "../../client/client-orders/items-orders.component"
import { OrderDetails } from "../../core/layouts/order-details/order-details.component"

/**
   * @interface ReportTrip
   * @description The report trip interface
   */
export interface ReportTrip {
    /**
     * @description The id of the trip
     * @type {string}
     */
    id?: string;

    /**
     * @description The user id
     * @type {string}
     */
    userId?: string,

    /**
     * @description The currency of the user
     * @type {Currency}
     */
    currency: Currency

    /**
     * @description The arrival date
     * @type {DateFromDatePicker}
     */
    arrivalDate: DateFromDatePicker,

    /**
     * @description The arrival time
     * @type {TimeFromTimePicker}
     */
    arrivalTime: TimeFromTimePicker,

    /**
     * @description The available space
     * @type {number}
     */
    availableSpace: number

    /**
     * @description The default price for the item
     * @type {number}
     */
    defaultPrice: number,

    /**
     * @description The departure date
     * @type {DateFromDatePicker}
     */
    departureDate: DateFromDatePicker,

    /**
     * @description The departure time
     * @type {TimeFromTimePicker}
     */
    departureTime: TimeFromTimePicker,

    /**
     * @description The destination airport
     * @type {any}
     */
    destinationAirport: any,

    /**
     * @description The destination country
     * @type {Country}
     */
    destinationCountry: Country,

    /**
     * @description The list of specific prices
     * @type {SpecificPrice[]}
     */
    specificPrice: SpecificPrice[],

    /**
     * @description The user airport
     * @type {any}
     */
    userAirport: any,

    /**
     * @description The user country
     * @type {Country}
     */
    userCountry: Country
  }

  /**
   * @enum ReportTripStatus
   * @description The report trip status
   */
  export enum ReportTripStatus {
    /**
     * @description The user country is not set
     * @type {string}
     */
    NO_USER_COUNTRY = "NO_USER_COUNTRY",

    /**
     * @description The user airport is not set
     * @type {string}
     */
    NO_USER_AIRPORT = "NO_USER_AIRPORT",

    /**
     * @description The departure date is not set
     * @type {string}
     */
    NO_DEPARTURE_DATE = "NO_DEPARTURE_DATE",

    /**
     * @description The departure date is invalid
     * @type {string}
     */
    INVALID_DEPARTURE_DATE = "INVALID_DEPARTURE_DATE",

    /**
     * @description The departure date has passed
     * @type {string}
     */
    DEPARTURE_DATE_PASSED = "DEPARTURE_DATE_PASSED",

    /**
     * @description The departure time is not set
     * @type {string}
     */
    NO_DEPARTURE_TIME = "NO_DEPARTURE_TIME",

    /**
     * @description The departure time is invalid
     * @type {string}
     */
    INVALID_DEPARTURE_TIME = "INVALID_DEPARTURE_TIME",

    /**
     * @description The destination country is not set
     * @type {string}
     */
    NO_DESTINATION_COUNTRY = "NO_DESTINATION_COUNTRY",

    /**
     * @description The destination airport is not set
     * @type {string}
     */
    NO_DESTINATION_AIRPORT = "NO_DESTINATION_AIRPORT",

    /**
     * @description The arrival date is not set
     * @type {string}
     */
    NO_ARRIVAL_DATE = "NO_ARRIVAL_DATE",

    /**
     * @description The arrival date is invalid
     * @type {string}
     */
    INVALID_ARRIVAL_DATE = "INVALID_ARRIVAL_DATE",

    /**
     * @description The arrival time is not set
     * @type {string}
     */
    NO_ARRIVAL_TIME = "NO_ARRIVAL_TIME",

    /**
     * @description The arrival time is invalid
     * @type {string}
     */
    INVALID_ARRIVAL_TIME = "INVALID_ARRIVAL_TIME",

    /**
     * @description The arrival date has passed
     * @type {string}
     */
    NO_AVAILABLE_SPACE = "NO_AVAILABLE_SPACE",

    /**
     * @description The available space is invalid
     * @type {string}
     */
    INVALID_AVAILABLE_SPACE = "INVALID_AVAILABLE_SPACE",

    /**
     * @description The default price is not set
     * @type {string}
     */
    NO_DEFAULT_PRICE = "NO_DEFAULT_PRICE",

    /**
     * @description The default price is invalid
     * @type {string}
     */
    INVALID_DEFAULT_PRICE = "INVALID_DEFAULT_PRICE",

    /**
     * @description The specific price is not set
     * @type {string}
     */
    INVALID_SPECIFIC_PRICE = "INVALID_SPECIFIC_PRICE",

    /**
     * @description The trip has been reported successfully
     * @type {string}
     */
    TRIP_REPORTED_SUCCESSFULLY = "TRIP_REPORTED_SUCCESSFULLY"
  }

  /**
   * @interface itemInformationRequest
   * @description An interface for the item information request
   */
  interface itemInformationRequest {
    /**
     * @description The category of the item
     * @type {ItemCategory}
     */
    itemCategory: ItemCategory,

    /**
     * @description The weight of the item
     * @type {number}
     */
    itemWeight: number,

    /**
     * @description The quantity of the item
     * @type {number}
     */
    itemQuantity: number
  }

  /**
   * @interface SearchTripsRequest
   * @description An interface for the search trips request
   */
  export interface SearchTripsRequest {
    /**
     * @description The user id
     * @type {string}
     */
    userId: string,

    /**
     * @description The user country
     * @type {Country}
     */
    userCountry: Country,

    /**
     * @description The user region
     * @type {any}
     */
    userRegion: any,

    /**
     * @description The destination country
     * @type {Country}
     */
    destinationCountry: Country,

    /**
     * @description The destination region
     * @type {any}
     */
    destinationRegion: any,

    /**
     * @description The month of the user is searching for trips
     * @type {Date}
     */
    month: Date,

    /**
     * @description The year of the user is searching for trips
     * @type {itemInformationRequest[]}
     */
    itemInformation: itemInformationRequest[]
  }

  /**
   * @interface SearchTripsApiResponse
   * @description An interface for the search trips api response
   */
  export interface SearchTripsApiResponse extends ApiResponse {
    /**
     * @description The user info
     * @type {UserInfo}
     */
    searchResults: StringKeys<ReportTrip>[]
  }

  /**
   * @interface ConfirmItemRequest
   * @description An interface for the confirm item request
   */
  export interface ConfirmItemRequest {
    /**
     * @description The items to send
     * @type {SendItemsRequest}
     */
    items: SendItemsRequest,

    /**
     * @description The trip id
     * @type {string}
     */
    tripId: string
  }

  /**
   * @enum SendItemsStatus
   * @description The send items status
   */
  export enum SendItemsStatus {
    /**
     * @description The user country is not set
     * @type {string}
     */
    NO_USER_COUNTRY = "NO_USER_COUNTRY",

    /**
     * @description The user region is not set
     * @type {string}
     */
    NO_USER_REGION = "NO_USER_REGION",

    /**
     * @description The destination country is not set
     * @type {string}
     */
    NO_DESTINATION_COUNTRY = "NO_DESTINATION_COUNTRY",

    /**
     * @description The destination region is not set
     * @type {string}
     */
    NO_DESTINATION_REGION = "NO_DESTINATION_REGION",

    /**
     * @description The consignee full name is not set
     * @type {string}
     */
    NO_CONSIGNEE_FULL_NAME = "NO_CONSIGNEE_FULL_NAME",

    /**
     * @description The consignee address is not set
     * @type {string}
     */
    NO_CONSIGNEE_ADDRESS = "NO_CONSIGNEE_ADDRESS",

    /**
     * @description The consignee phone number is not set
     * @type {string}
     */
    NO_CONSIGNEE_PHONE_NUMBER = "NO_CONSIGNEE_PHONE_NUMBER",

    /**
     * @description The consignee full name is invalid
     * @type {string}
     */
    INVALID_CONSIGNEE_FULL_NAME = "INVALID_CONSIGNEE_FULL_NAME",

    /**
     * @description The consignee address is invalid
     * @type {string}
     */
    INVALID_CONSIGNEE_PHONE_NUMBER = "INVALID_CONSIGNEE_PHONE_NUMBER",

    /**
     * @description The item name is not set
     * @type {string}
     */
    NO_ITEM_NAME = "NO_ITEM_NAME",

    /**
     * @description The item category is not set
     * @type {string}
     */
    NO_ITEM_CATEGORY = "NO_ITEM_CATEGORY",

    /**
     * @description The item weight is not set
     * @type {string}
     */
    NO_ITEM_WEIGHT = "NO_ITEM_WEIGHT",

    /**
     * @description The item quantity is not set
     * @type {string}
     */
    NO_ITEM_QUANTITY = "NO_ITEM_QUANTITY",

    /**
     * @description The item weight is invalid
     * @type {string}
     */
    INVALID_ITEM_WEIGHT = "INVALID_ITEM_WEIGHT",

    /**
     * @description The item quantity is invalid
     * @type {string}
     */
    INVALID_ITEM_QUANTITY = "INVALID_ITEM_QUANTITY",

    /**
     * @description The reason for shipping is not set
     * @type {string}
     */
    NO_REASON_SHIPPING = "NO_REASON_SHIPPING",

    /**
     * @description The items were sent successfully
     * @type {string}
     */
    ITEMS_SENT_SUCCESSFULLY = "ITEMS_SENT_SUCCESSFULLY",
  }

  /**
   * @interface SendItemsRequest
   * @description An interface for the send items request
   */
  export interface SendItemsRequestApiResponse extends ApiResponse {
    /**
     * @description The id of the new request
     * @type {string}
     */
    newId: string;
  }

  export interface RequestTableElementRequest {
    /**
     * @description The id of the request
     * @type {string}
     */
    id: string;
  
    /**
     * @description The departure airport of the flight
     * @type {any}
     */
    from: any;

    /**
     * @description The arrival airport of the flight
     * @type {any}
     */
    to: any;
  
    /**
    * @description The delivery date of the request
    * @type {Date}
    */
    deliveryDate: Date;
  
    /**
     * @description The status of the request
     * @type {ItemsStatus}
     */
    status: ItemsStatus
  }

  /**
   * @interface ItemInformationApiResponse
   * @description An interface for the item information api response
   */
  export interface ItemInformationApiResponse {
    /**
     * @description The item information
     */
    order: OrderDetails;
  }

  /**
   * @interface UpdateImageNameRequest
   * @description An interface for the update image name request
   */
  export interface UpdateImageNameRequest {
    /**
     * @description The new filename
     * @type {string}
     */
    filename: string;

    /**
     * @description The index of the image
     * @type {number}
     */
    index: number;

    /**
     * @description The id of the request
     * @type {string}
     */
    id: string; 
  }

  /**
   * @interface CreateAlertRequest
   * @description An interface for the create alert request
   */
  export interface CreateAlertRequest {
    /**
     * @description The send items request
     * @type {SendItemsRequest}
     */
    items: SendItemsRequest,

    /**
     * @description from date
     * @type {DateFromDatePicker}
     */
    from?: DateFromDatePicker,

    /**
     * @description to date
     * @type {DateFromDatePicker}
     */
    to?: DateFromDatePicker,

    /**
     * @description The max price
     * @type {number}
     */
    maxPrice?: number,
  }

  /**
   * @enum CreateAlertStatus
   * @description The create alert status
   */
  export enum CreateAlertStatus {
    /**
     * @description The from date is not valid.
     * @type {string}
     */
    INVALID_FROM_DATE = "INVALID_FROM_DATE",

    /**
     * The max price is not valid.
     * @type {string}
     */
    INVALID_MAX_PRICE = "INVALID_MAX_PRICE",

    /**
     * @description The alert was created successfully.
     * @type {string}
     */
    ALERT_CREATED_SUCCESSFULLY = "ALERT_CREATED_SUCCESSFULLY"
  }

  /**
   * @interface ListItemsApiResponse
   * @description An interface for the list items api response
   */
  export enum ItemsOrdersStatus {
    /**
     * @description The items were found
     * @type {string}
     */
    ITEMS_FOUND = "ITEMS_FOUND",

    /**
     * @description The items were not found
     * @type {string}
     */
    ITEMS_NOT_FOUND = "ITEMS_NOT_FOUND"
  }

  /**
   * @interface ListItemsApiResponse
   * @description An interface for the list items api response
   */
  export interface ListItemsApiResponse extends ApiResponse {
    /**
     * @description The orders
     * @type {RequestTableElement[]}
     */
    orders: RequestTableElement[];
  }

  /**
   * @enum
   * @description The waiting gp confirmation status  
   */
  export enum WaitingGpConfirmationStatus {
    /**
     * @description The item was found
     * @type {string}
     */
    ITEM_FOUND = "ITEM_FOUND",

    /**
     * @description The item was not found
     * @type {string}
     */
    ITEM_NOT_FOUND = "ITEM_NOT_FOUND"
  }

  /**
   * @interface ClientCancelRequest
   * @description An interface for the client cancel request
   */
  export interface ClientCancelRequest {
    /**
     * @description The id of the request
     * @type {string}
     */
    id: string;

    /**
     * @description The order id
     * @type {string}
     */
    orderId: string;

    /**
     * @description The trip id
     * @type {string}
     */
    tripId: string;
  }

  /**
   * @enum ClientCancelStatus
   * @description The client cancel status
   */
  export enum ClientCancelStatus {
    /**
     * @description The order was canceled successfully
     * @type {string}
     */
    ORDER_CANCELED_SUCCESSFULLY = "ORDER_CANCELED_SUCCESSFULLY"
  }