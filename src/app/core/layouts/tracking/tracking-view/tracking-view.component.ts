import { Component, Input, OnInit } from "@angular/core";
import { TrackingPoint, TrackingPointType } from "../tracking.type";
import { BehaviorSubject, tap } from "rxjs";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { BaseTrackingComponent } from "../base-tracking.component";
import { CountryUtil } from "../../../../misc/util/country.util";
import { GhDate, GhDateProperties } from "../../../../misc/classes/gh-date";

/**
 * @interface Tracking
 * @description The tracking interface
 */
interface Tracking extends TrackingPoint {
    /**
     * @description If the tracking point is done
     * @type {boolean}
     */
    done: boolean;
}

/**
 * @class GhTrackingViewComponent
 * @description The tracking view component
 */
@Component({
    selector: 'gh-tracking-view',
    templateUrl: './tracking-view.component.html',
    styleUrl: './tracking-view.component.scss',
  })
  export class GhTrackingViewComponent extends BaseTrackingComponent implements OnInit {
    /**
     * @description The backing field for the tracking points
     * @type {BehaviorSubject<Tracking[]>}
     */
    private readonly _trackingPoints$ = new BehaviorSubject<Tracking[]>(undefined);

    /**
     * @description The tracking points
     * @type {Observable<Tracking[]>}
     */
    protected get trackingPoints() {
        return this._trackingPoints$.value;
    }

    /**
     * @description A boolean indicating if the trip is canceled
     * @type {boolean}
     */
    protected get isCanceledTrip() {
        return this.trackingPoints.some(point => point.exception);
    }

    /**
     * @description The current checkpoint
     * @type {Tracking}
     */
    protected get currentCheckpoint() {
        const index = this.trackingPoints.findIndex(point => !point.done) - 1;
        return this.trackingPoints[index];
    }

    /**
     * @description The last checkpoint
     * @type {Tracking}
     */
    protected get lastCheckpoint() {
        return this.trackingPoints[this.trackingPoints.length - 1];
    }

    /**
     * @description The width of the transit element
     * @type {string}
     */
    protected get transitWidth() {
        return (100 / this.trackingPoints.length)+"%";
    }
    
    /** @inheritdoc */
    ngOnInit(): void {
        this.filteredHistory$.pipe(
            tap(history => {
                const withGpDate = new GhDate(this.departureDate);
                withGpDate.relativeSetDate(-3)

                const finalCheckpointDate = new GhDate(this.arrivalDate);
                finalCheckpointDate.relativeSetTime(3);

                const layovers = [...(this.layovers || []).map(layover => ([{
                    date: layover.arrivalDate.date,
                    type: TrackingPointType.ARRIVAL,
                    location: CountryUtil.getCityByAirportCode(layover.airport),
                    orderId: null,
                    exception: undefined,
                    done: history.some(point => point.type === TrackingPointType.ARRIVE_LAYOVER && point.location === CountryUtil.getCityByAirportCode(layover.airport))
                },
                {
                    date: layover.departureDate.date,
                    type: TrackingPointType.DEPARTURE,
                    location: CountryUtil.getCityByAirportCode(layover.airport),
                    orderId: null,
                    exception: undefined,
                    done: history.some(point => point.type === TrackingPointType.LEAVING_LAYOVER && point.location === CountryUtil.getCityByAirportCode(layover.airport))
                }])).flat()
            ]
        
            this._trackingPoints$.next([
                {
                    date: null,
                    type: TrackingPointType.AT_CHECKPOINT,
                    location: this.originCity,
                    orderId: null,
                    exception: history.find(point => point.type === TrackingPointType.AT_CHECKPOINT && point.exception)?.exception,
                    done: true
                },
                {
                    date: withGpDate.toJson(),
                    type: TrackingPointType.WITH_GP,
                    location: this.originCity,
                    orderId: null,
                    exception: history.find(point => point.type === TrackingPointType.WITH_GP && point.exception)?.exception,
                    done: (this.orderId ? history: this.history).some(point => point.type === TrackingPointType.WITH_GP)
                },
                {
                    date: this.departureDate,
                    type: TrackingPointType.FIRST_DEPARTURE,
                    location: this.originCity,
                    orderId: null,
                    exception: undefined,
                    done: history.some(point => point.type === TrackingPointType.FIRST_DEPARTURE)
                },
                ...layovers,
                {
                    date: this.arrivalDate,
                    type: TrackingPointType.LAST_ARRIVAL,
                    location: this.destinationCity,
                    orderId: null,
                    exception: undefined,
                    done: history.some(point => point.type === TrackingPointType.LAST_ARRIVAL)
                },
                {
                    date: finalCheckpointDate.toJson(),
                    type: TrackingPointType.FINAL_CHECKPOINT,
                    location: this.destinationCity,
                    orderId: null,
                    exception: undefined,
                    done: (this.orderId ? history: this.history).some(point => point.type === TrackingPointType.FINAL_CHECKPOINT)
                },
            ])
        })).subscribe()
    }

    /**
     * @description Get the country of a city
     * @param city The city
     * @returns {string}
     */
    protected getCountry(city: string): string {
        return COUNTRY_INFO_LIST.find(x => x.regions.find(z => z === city))?.name
    }

    /**
    * @description Transforms a GhDateProperties object into a Date object
    * @param date The date to transform
    * @returns {Date}
    */
    protected getDate(date: GhDateProperties): Date {
        return new Date(date.year, date.month, date.day, date.hour, date.minute);
      }
  }