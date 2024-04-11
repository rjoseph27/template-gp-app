import { Directive, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TrackingPoint } from "./tracking.type";
import { Layovers } from "../request/create-layover/create-layover.component";
import { BehaviorSubject } from "rxjs";
import { GhDateProperties } from "../../../misc/classes/gh-date";
import { TripStatus } from "../../../client/orders/base-orders.component";

/**
 * @class BaseTrackingComponent
 * @description The base tracking component
 */
@Directive()
export class BaseTrackingComponent {
    /**
     * @description The backing field for the filtered history
     * @type {BehaviorSubject<TrackingPoint[]>}
     */
    protected _filteredHistory$ = new BehaviorSubject<TrackingPoint[]>(undefined);

    /**
     * @description The observable for the filtered history
     * @type {Observable<TrackingPoint[]>}
     */
    protected filteredHistory$ = this._filteredHistory$.asObservable();

    /**
     * @description The filtered history
     * @type {TrackingPoint[]}
     */
    protected set filteredHistory(value: TrackingPoint[]) {
        this._filteredHistory$.next(value);
    }
    protected get filteredHistory() {
        return this._filteredHistory$.value;
    }

    /**
     * @description Backing field for the order id
     * @type {string}
     */
    private _orderId: string;

    /**
     * @description The history of the tracking
     * @type {TrackingPoint[]}
     */
    @Input() history: TrackingPoint[];

    /**
     * @description The layovers
     * @type {Layovers[]}
     */
    @Input() layovers: Layovers[]

    /**
     * @description The departure date
     * @type {GhDateProperties}
     */
    @Input() departureDate: GhDateProperties

    /**
     * @description The arrival date
     * @type {GhDateProperties}
     */
    @Input() arrivalDate: GhDateProperties

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
     * @description The status of the trip
     * @type {TripStatus}
     */
    @Input() status: TripStatus;

    /**
     * @description The order id
     * @type {string}
     */
    @Input() set orderId(value: string) {
        this._orderId = value;
        this.filteredHistory = this.history.filter(point => point.orderId === value || !point.orderId);
    } 
    get orderId() {
        return this._orderId;
    }

    /**
     * @description The order id change event
     * @type {EventEmitter<string>}
     */
    @Output() orderIdChange = new EventEmitter<string>();
}