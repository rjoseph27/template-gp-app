export enum TrackingPointType {
    TRIP_CREATION = 'TRIP_CREATION',
    AT_CHECKPOINT = 'AT_CHECKPOINT',
    ORDER_ACCEPTED = 'ORDER_ACCEPTED',
    WITH_GP = 'WITH_GP',
    CANCELED_AT_CHECKPOINT = 'CANCELED_AT_CHECKPOINT',
    FIRST_DEPARTURE = 'FIRST_DEPARTURE',
    DEPARTURE = 'DEPARTURE',
    ARRIVAL = 'ARRIVAL',
    LAST_ARRIVAL = 'LAST_ARRIVAL',
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
     * @type {Date}
     */
    date?: Date;

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
     * @description The order was canceled
     * @type {string}
     */
    CANCELED = 'CANCELED',

    /**
     * @description The order was lost
     * @type {string}
     */
    LOST = 'LOST',

    /**
     * @description The GP has been denied on boarding
     * @type {string}
     */
    DENIED_ON_BOARDING = 'DENIED_ON_BOARDING',

    /**
     * @description The GP has been denied on arrival
     * @type {string}
     */
    DENIED_ON_ARRIVAL = 'DENIED_ON_ARRIVAL',

    /**
     * @description The GP has missed his flight
     * @type {string}
     */
    MISSED_FLIGHT = 'MISSED_FLIGHT',

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