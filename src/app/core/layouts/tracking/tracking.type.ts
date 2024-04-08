import { GhDateProperties } from "../../../misc/classes/gh-date";

/**
 * @interface TrackingPointType
 * @description The tracking point type
 */
export enum TrackingPointType {
    /**
     * @description The trip creation
     * @type {string}
     */
    TRIP_CREATION = 'TRIP_CREATION',

    /**
     * @description The order at checkpoint
     * @type {string}
     */
    AT_CHECKPOINT = 'AT_CHECKPOINT',

    /**
     * @description The order accepted
     * @type {string}
     */
    ORDER_ACCEPTED = 'ORDER_ACCEPTED',

    /**
     * @description The order with gp
     * @type {string}
     */
    WITH_GP = 'WITH_GP',

    /**
     * @description The gp is on the way to the airport
     * @type {string}
     */
    ON_WAY_TO_AIRPORT = 'ON_WAY_TO_AIRPORT',

    /**
     * @description The first departure
     * @type {string}
     */
    FIRST_DEPARTURE = 'FIRST_DEPARTURE',

    /**
     * @description The departure of a layover
     * @type {string}
     */
    DEPARTURE = 'DEPARTURE',

    /**
     * @description The arrival of a layover
     * @type {string}
     */
    ARRIVAL = 'ARRIVAL',

    /**
     * @description The last arrival
     * @type {string}
     */
    LAST_ARRIVAL = 'LAST_ARRIVAL',

    /**
     * @description The final checkpoint
     * @type {string}
     */
    ON_WAY_TO_FINAL_CHECKPOINT = 'ON_WAY_TO_FINAL_CHECKPOINT',

    /**
     * @description The final checkpoint
     * @type {string}
     */
    FINAL_CHECKPOINT = 'FINAL_CHECKPOINT'
}

/**
 * @interface TrackingPoint
 * @description The tracking point
 */
export interface TrackingPoint {
    /**
     * @description The trip id
     * @type {string}
     */
    tripId?: string;
    
    /**
     * @description The planned date
     * @type {GhDateProperties}
     */
    date?: GhDateProperties;

    /**
     * @description The type of the tracking point
     * @type {TrackingPointType}
     */
    type: TrackingPointType;

    /**
     * @description The location of the tracking point
     * @type {string}
     */
    location: string;

    /**
     * @description The order id
     * @type {string}
     */
    orderId: string;

    /**
     * @description The exception
     * @type {DeliveryException}
     */
    exception: DeliveryExceptionType;
}

/**
 * @enum DeliveryExceptionType
 * @description The delivery exception type
 */
export enum DeliveryExceptionType {
    /**
     * @description The order was canceled at checkpoint
     * @type {string}
     */
    CANCELED_AT_CHECKPOINT = 'CANCELED_AT_CHECKPOINT',

    /**
     * @description The trip has been canceled
     * @type {string}
     */
    TRIP_CANCELED = 'TRIP_CANCELED',

    /**
     * @description The trip canceled while delivery
     * @type {string}
     */
    CANCELED = 'CANCELED',

    /**
     * @description The order was lost
     * @type {string}
     */
    LOST = 'LOST',

    /**
     * @description The order has been seized by customs
     * @type {string}
     */
    ITEM_SEIZED = 'ITEM_SEIZED',

    /**
     * @description The item has been damaged
     * @type {string}
     */
    ITEM_DAMAGED = 'ITEM_DAMAGED',
}