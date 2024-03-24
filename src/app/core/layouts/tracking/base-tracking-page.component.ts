import { Directive, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { ReportTrip } from "../../../api/requests/requests.type";
import { SUCCURSALE_BY_COUNTRY } from "../../../misc/constants/countries/countries.type";

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
        protected readonly history$ = this.route.data.pipe(map(data => (<ReportTrip>data['trip']).history.map(x => {
          x.date = new Date(x.date);
          return x
        })));
    
        /**
         * @description An observable for the order id
         * @type {Observable<string>}
         */
        protected readonly orderId$ = this.route.queryParamMap.pipe(map(params => params.get('id')));
    
        /**
         * @description An observable for the departure date
         * @type {Observable<Date>}
         */
        protected readonly departureDate$ = this.route.data.pipe(map(data => {
          const date = new Date((<ReportTrip>data['trip']).departureDate.dateString);
          const time = (<ReportTrip>data['trip']).departureTime.time;
          date.setHours(time.hours);
          date.setMinutes(time.minutes);
          return date;
        }));
    
        /**
         * @description An observable for the arrival date
         * @type {Observable<Date>}
         */
        protected readonly arrivalDate$ = this.route.data.pipe(map(data => {
          const date = new Date((<ReportTrip>data['trip']).arrivalDate.dateString);
          const time = (<ReportTrip>data['trip']).arrivalTime.time;
          date.setHours(time.hours);
          date.setMinutes(time.minutes);
          return date;
        }));
    
        /**
         * @description An observable for the origin city
         * @type {Observable<string>}
         */
        protected readonly originCity$ = this.route.data.pipe(map(data => {
          const regions = SUCCURSALE_BY_COUNTRY.map(x => x.regions).flat(); 
          const city = regions.find(z => z[1].airport === (<ReportTrip>data['trip']).userAirport)
          return city[0];
        }));
    
        /**
         * @description An observable for the destination city
         * @type {Observable<string>}
         */
        protected readonly destinationCity$ = this.route.data.pipe(map(data => {
          const regions = SUCCURSALE_BY_COUNTRY.map(x => x.regions).flat(); 
          const city = regions.find(z => z[1].airport === (<ReportTrip>data['trip']).destinationAirport)
          return city[0];
        }));
}