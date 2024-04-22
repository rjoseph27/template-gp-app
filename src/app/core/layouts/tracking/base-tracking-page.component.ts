import { Directive, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { ReportTrip } from "../../../api/requests/requests.type";
import { CountryUtil } from "../../../misc/util/country.util";
import { GhDate } from "../../../misc/classes/gh-date";
import { Observable } from "rxjs";

/**
 * @class BaseTrackingPageComponent
 * @description The base tracking page component
 */
@Directive()
export class BaseTrackingPageComponent {
      /**
      * @description The activated route service
      * @type {ActivatedRoute}
      */
      protected readonly route = inject(ActivatedRoute);

        /**
         * @description An observable for the trip history
         * @type {Observable<Trip>}
         */
        protected readonly history$ = this.route.data.pipe(
          tap(data => console.log((<ReportTrip>data['trip']))),
          map(data => (<ReportTrip>data['trip']).history),
        );
    
        /**
         * @description An observable for the departure date
         * @type {Observable<Date>}
         */
        protected readonly departureDate$ = this.route.data.pipe(map(data => {
          const date = (<ReportTrip>data['trip']).departureDate.date;
          const time = (<ReportTrip>data['trip']).departureTime.time;
          return new GhDate({...date, hour: time.hours, minute: time.minutes}).toJson();
        }));
    
        /**
         * @description An observable for the arrival date
         * @type {Observable<Date>}
         */
        protected readonly arrivalDate$ = this.route.data.pipe(map(data => {
          const date = (<ReportTrip>data['trip']).arrivalDate.date;
          const time = (<ReportTrip>data['trip']).arrivalTime.time;
          return new GhDate({...date, hour: time.hours, minute: time.minutes}).toJson();
        }));
    
        /**
         * @description An observable for the origin city
         * @type {Observable<string>}
         */
        protected readonly originCity$ = this.route.data.pipe(map(data => CountryUtil.getCityByAirportCode((<ReportTrip>data['trip']).userAirport)));
    
        /**
         * @description An observable for the destination city
         * @type {Observable<string>}
         */
        protected readonly destinationCity$ = this.route.data.pipe(map(data => CountryUtil.getCityByAirportCode((<ReportTrip>data['trip']).destinationAirport)));

        /**
         * @description An observable for the trip status
         * @type {Observable<string>}
         */
        protected readonly tripStatus$ = this.route.data.pipe(map(data => (<ReportTrip>data['trip']).status));

        /**
         * @description An observable for the layovers
         * @type {Observable<Layovers[]>}
         */
        protected readonly layovers$ = this.route.data.pipe(map(data => (<ReportTrip>data['trip']).layovers));

    /**
     * @description The orders observable
     * @type {Observable<number[]>}
     */
    protected readonly orders$: Observable<number[]> = this.route.data.pipe(map(data => (<ReportTrip>data['trip']).orders));
}