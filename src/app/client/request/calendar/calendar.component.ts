import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { ReportTrip } from "../../../api/requests/requests.type";
import { ClientSendItemsService } from "../../service/send-items.service";
import { ClientRequestsService } from "../../service/requests.service";
import { DateUtil } from "../../../misc/util/date.util";


/**
 * @class ClientCalendarComponent
 * @description The calendar component
 */
@Component({
    selector: 'client-calendar',
    templateUrl: './calendar.component.html',
  })
  export class ClientCalendarComponent implements OnInit {
    /**
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description The backing field for the loading observable
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _loading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the loading state
     * @type {Observable<boolean>}
     */
    protected readonly loading$ = this._loading$.asObservable();

    /**
     * @description The backing field for the max price
     * @type {BehaviorSubject<number>}
     */
    private readonly _maxPrice$ = new BehaviorSubject<number>(undefined);

    /**
     * @description The max price
     * @type {Observable<number>}
     */
    protected readonly maxPrice$ = this._maxPrice$.asObservable();

    /**
     * @description The trips cache
     * @type {Map<number, ReportTrip[]>}
     */
    private readonly tripsCache = new Map<Date, ReportTrip[]>();

    /**
     * @description The backing field for the shipping list
     * @type {BehaviorSubject<ReportTrip[]>}
     */
    private readonly _shippingList$ = new BehaviorSubject<ReportTrip[]>(this.route.snapshot.data['calendarInfo'].trips);

    /**
     * @description The current rates for the user currency
     * @type {any}
     */
    protected readonly rates = this.route.snapshot.data['calendarInfo'].rates;

    /**
     * @description The send items service
     * @type {ClientSendItemsService}
     */
    private readonly senditemsService = inject(ClientSendItemsService);

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
     * @description The items
     * @type {SendItemsRequest}
     */
    protected get items() {
        return this.senditemsService.requests;
    }

    /**
     * @description An observable for the shipping list
     * @type {Observable<ReportTrip[]>}
     */
    protected readonly shippingList$ = this._shippingList$.asObservable();

    /**
     * @description The default date
     * @type {Date}
     */
    private readonly defaultDate = DateUtil.addDaysFromDate(new Date(),1);

    /**
     * @description The backing field for the month
     * @type {BehaviorSubject<number>}
     */
    private readonly _month$ = new BehaviorSubject<number>(this.defaultDate.getMonth());

    /**
     * @description An observable for the month
     * @type {Observable<number>}
     */
    protected readonly month$ = this._month$.asObservable();

    /**
     * @description The backing field for the year
     * @type {BehaviorSubject<number>}
     */
    private readonly _year$ = new BehaviorSubject<number>(this.defaultDate.getFullYear());

    /**
     * @description An observable for the year
     * @type {Observable<number>}
     */
    protected readonly year$ = this._year$.asObservable();

    /** @inheritdoc */
    ngOnInit(): void {
      this.tripsCache.set(this.defaultDate, this.route.snapshot.data['calendarInfo'].trips);
      
      this.route.queryParams.pipe(
        tap(params => {
          this._maxPrice$.next(params['maxPrice'])
          if(params['month']) {
            this._month$.next(params['month']);
          }
          if(params['year']) {
            this._year$.next(params['year']);
          }
        }),
      ).subscribe()
    }

    /**
     * @description Search for trips in a given month
     * @param month The month to display
     */
    protected async searchTrips(month: Date) {
        this._loading$.next(true);
        if(this.tripsCache.has(month)) {
            this._shippingList$.next(this.tripsCache.get(month));
            this._loading$.next(false);
        } else {
          const newRequest = await this.requestsService.searchTrips(this.senditemsService.requests, month);
          this._shippingList$.next(newRequest as ReportTrip[]);
          this.tripsCache.set(month, newRequest as ReportTrip[]);
          this._loading$.next(false);
        }
    }
  }