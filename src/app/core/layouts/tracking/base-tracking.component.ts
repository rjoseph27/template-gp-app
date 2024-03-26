import { Directive, Input, OnInit } from "@angular/core";
import { TrackingPoint } from "./tracking.type";
import { Layovers } from "../request/create-layover/create-layover.component";
import { BehaviorSubject } from "rxjs";

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
    @Input() set orderId(value: string) {
        this._orderId = value;
        this.filteredHistory = this.history.filter(point => point.orderId === value || !point.orderId);
    } 
    get orderId() {
        return this._orderId;
    }
}