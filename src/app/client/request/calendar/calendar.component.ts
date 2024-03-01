import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ReportTrip } from "../../../api/requests/requests.type";
import { ClientSendItemsService } from "../../service/send-items.service";


/**
 * @class ClientCalendarComponent
 * @description The calendar component
 */
@Component({
    selector: 'client-calendar',
    templateUrl: './calendar.component.html',
  })
  export class ClientCalendarComponent  {
    /**
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);

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
  }