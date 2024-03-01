import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ReportTrip } from "../../../api/requests/requests.type";
import { ClientSendItemsService } from "../../service/send-items.service";
import { ClientRequestsService } from "../../service/requests.service";


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
     * @description The trips cache
     * @type {Map<number, ReportTrip[]>}
     */
    private readonly tripsCache = new Map<number, ReportTrip[]>();

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
     * @description The backing field for the month
     * @type {BehaviorSubject<number>}
     */
    private readonly _months$ = new BehaviorSubject<number>(this.route.snapshot.data['calendarInfo'].month);

    /**
     * @description The month
     * @type {number}
     */
    protected set months(month: number) {
        this._months$.next(month);
    }
    protected get months() {
        return this._months$.value;
    }

    /** @inheritdoc */
    ngOnInit(): void {
      this.tripsCache.set(this.route.snapshot.data['calendarInfo'].month, this.route.snapshot.data['calendarInfo'].trips);
    }

    /**
     * @description Search for trips in a given month
     * @param month The month to display
     */
    protected async searchTrips(month: number) {
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