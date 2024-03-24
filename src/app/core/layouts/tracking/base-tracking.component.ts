import { Directive, Input } from "@angular/core";
import { TrackingPoint } from "./tracking.type";
import { Layovers } from "../request/create-layover/create-layover.component";

/**
 * @class BaseTrackingComponent
 * @description The base tracking component
 */
@Directive()
export class BaseTrackingComponent {
    /**
     * @description The history of the tracking
     * @type {TrackingPoint[]}
     */
    @Input() history: TrackingPoint[]

    /**
     * @description The layovers
     * @type {Layovers[]}
     */
    @Input() layovers: Layovers[]

    /**
     * @description The departure date
     * @type {Date}
     */
    @Input() departureDate: Date

    /**
     * @description The arrival date
     * @type {Date}
     */
    @Input() arrivalDate: Date

    /**
     * @description The origin city
     * @type {string}
     */
    @Input() originCity: string

    /**
     * @description The destination city
     * @type {string}
     */
    @Input() destinationCity: string

    /**
     * @description The order id
     * @type {string}
     */
    @Input() orderId: string;
}