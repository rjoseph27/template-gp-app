import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";


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