import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, inject } from "@angular/core";
import { NEXT_PAGE_ICON, PREVIOUS_PAGE_ICON } from "../../../../misc/constants/icon";
import { Month, TripInfo, WeekDays } from "./calendar.enum";
import { BehaviorSubject, map } from "rxjs";
import { ReportTrip } from "../../../../api/requests/requests.type";
import { SendItemsRequest } from "../../../../client/service/send-items.service";
import { MoneyUtil } from "../../../../misc/util/money.util";
import { Unit } from "../report-trip/report.time.constant";
import { DateUtil } from "../../../../misc/util/date.util";
import { SelectTripCaption } from "./console-view/select-trip/select-trip.component";
import { FilterTripCaption } from "./console-view/filter-trip/filter-trip.component";
import { AlertTripCaptions } from "./console-view/alert-trip/alert-trip.component";

/**
 * @constant FILTER_ICON
 * @description The filter icon
 */
const FILTER_ICON = "tune";

/**
 * @constant ALERT_ICON
 * @description The alert icon
 */
const ALERT_ICON = "warning";

/**
 * @interface DateCell
 * @description The information of a date cell
 */
interface DateCell {
  /**
   * @description The day
   * @type {number}
   */
  day: number;

  /**
   * @description The id of the trip
   * @type {string}
   */
  id: string;
}

/**
 * @interface DayPoint
 * @description The position of a day in the calendar
 */
interface DayPoint {
  /**
   * @description The week
   */
  week: number;

  /**
   * @description The day in the week
   */
  cell: number;
}

/**
 * @class GhCalendarComponent
 * @description The calendar component
 */
@Component({
    selector: 'gh-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
  })
  export class GhCalendarComponent  {
   /**
    * @description The month
    * @type {number}
    */
   @Input() month: number = new Date().getMonth();

   /**
    * @description The year
    * @type {number}
    */
   @Input() year: number = new Date().getFullYear();

   /**
    * @description The current rates for the user currency
    * @type {any}
    */
   @Input() rates: any;

   /**
    * @description The item to send
    * @type {SendItemsRequest}
    */
   @Input() items: SendItemsRequest;

    /**
    * @description The loading state
    * @type {boolean}
    */
    @Input() loading: boolean;

    /**
     * @description The backing field for the filter value
     * @type {BehaviorSubject<number>}
     */
    private readonly _filterValue$ = new BehaviorSubject<number>(undefined);

    /**
     * @description An observable for the filter value
     * @type {Observable<number>}
     */ 
    protected readonly filterValue$ = this._filterValue$.asObservable();

    /**
     * @description The filter value
     * @type {number}
     */
    protected set filterValue(value: number) {
      this._filterValue$.next(value);
    }
    protected get filterValue() {
      return this._filterValue$.value;
    }

   /**
    * @description The elements to display in the calendar
    * @type {ReportTrip[]}
    */
   @Input() set elements(value: ReportTrip[]) {
      this._elements$.next(value);
      this._dataCellList$.next(value.map((element) => {
        return { day: new Date(element.departureDate.date).getDate(), id: element.id}
      }));
   }
    get elements() {
        return this._elements$.value;
    }

    /**
     * @description The selected trip caption
     * @type {SelectTripCaption}
     */
    @Input() selectTripCaptions: SelectTripCaption;

    /**
     * @description The filter trip caption
     * @type {FilterTripCaption}
     */
    @Input() filterTripCaptions: FilterTripCaption

    /**
     * @description The alert trip caption
     * @type {AlertTripCaptions}
     */
    @Input() alertTripCaptions: AlertTripCaptions

    /**
    * @description The backing field for the selected trip
    * @type {BehaviorSubject<ReportTrip>}
    */
   private readonly _selectedTrip$ = new BehaviorSubject<ReportTrip>(undefined);

   /**
    * @description An observable for the selected trip
    * @type {Observable<ReportTrip>}
    */
   protected readonly selectedTrip$ = this._selectedTrip$.asObservable();

   /**
   * @description The backing field for the filter selected
   * @type {BehaviorSubject<boolean>}
   */
   private readonly _filterSelected$ = new BehaviorSubject<boolean>(false);

   /**
   * @description An observable of a boolean that indicates if the filter is selected
   * @type {Observable<boolean>}
   */
   protected readonly filterSelected$ = this._filterSelected$.asObservable();

   /**
   * @description The backing field for the alert date
   * @type {BehaviorSubject<Date>}
   */
   private readonly _alertDate$ = new BehaviorSubject<Date>(undefined);

   /**
    * @description An observable of a date that indicates the alert date
    * @type {Observable<Date>}
    */
   protected readonly alertDate$ = this._alertDate$.asObservable();

   /**
    * @description The backing field for the alert selected
    * @type {BehaviorSubject<boolean>}
    */
   private readonly _alertSelected$ = new BehaviorSubject<boolean>(false);

   /**
    * @description An observable of a boolean that indicates if the alert is selected
    * @type {Observable<boolean>}
    */
   protected readonly alertSelected$ = this._alertSelected$.asObservable();

   /**
    * @description The backing field for the elements
    * @type {BehaviorSubject<ReportTrip[]>}
    */
    private _elements$ = new BehaviorSubject<ReportTrip[]>([]);

    /**
     * @description The data cell list
     * @type {BehaviorSubject<DateCell[]>}
     */
    private _dataCellList$ = new BehaviorSubject<DateCell[]>([]);

   /**
    * @description Backing field for the base date
    * @type {BehaviorSubject<Date>}
    */
   private readonly _baseDate$ = new BehaviorSubject<Date>(new Date(this.year, this.month, 1));

   /**
    * @description An observable for the base date
    * @type {Observable<Date>}
    */
   protected readonly baseDate$ = this._baseDate$.asObservable();

   /**
    * @description A Emmiter for the month year change
    * @type {EventEmitter<Date>}
    */
   @Output() readonly monthYearChange = new EventEmitter<Date>();

   /**
    * @description The angular renderer service.
    * @type {Renderer2}
    */
   private renderer: Renderer2 = inject(Renderer2)
   
   /**
    * @description The element reference
    * @type {ElementRef}
    */
   private elementRef: ElementRef = inject(ElementRef);

   /**
    * @description The first day of the month
    * @type {Observable<number>}
    */
   private readonly _firstDayOfMonth$ = new BehaviorSubject<number>(this._baseDate$.value.getDay());

   /**
   * @description The previous month icon
   * @type {string}
   */
   protected readonly previousMonthIcon = PREVIOUS_PAGE_ICON;

   /**
   * @description The next month icon
   * @type {string}
   */
   protected readonly nextMonthIcon = NEXT_PAGE_ICON;

   /**
    * @description The filter icon
    * @type {string}
    */
   protected readonly filterIcon = FILTER_ICON;

   /**
    * @description The alert icon
    * @type {string}
    */
   protected readonly alertIcon = ALERT_ICON;

   /**
    * @description The week days
    * @type {WeekDays[]}
    */
   protected readonly weekDays = Object.values(WeekDays);

   /**
    * @description The months
    * @type {Month[]}
    */
   private readonly months = Object.values(Month);

   /**
    * @description backing field for the selected date
    * @type {BehaviorSubject<DayPoint>}
    */
   private readonly _selectedDate$ = new BehaviorSubject<DayPoint>(undefined);

   /**
    * @description A method to get the first letter of a day
    * @param day The day
    * @returns {string}
    */
   protected getFirstLetter(day: string): string {
      return day.charAt(0);
   }

   /**
    * @description A method to get the month name
    * @param month The month as a number
    * @returns {Month}
    */
   protected getMonthName(month: number): Month {
      return this.months[month];
   }

   /**
    * @description The minimum month that the user can select
    * @type {Date}
    */
   protected readonly minimumMonth = DateUtil.currentBaseDate();

   /**
    * @description A method to select a date
    * @param week The week
    * @param cell The cell
    * @returns {void}
    */
   protected selectDate(week: number, cell: number): void {
    if(this._selectedDate$.value) {
      const oldElement = this.elementRef.nativeElement.querySelector(`.cell-${this._selectedDate$.value.week}-${this._selectedDate$.value.cell}`);
      this.renderer.removeClass(oldElement, 'selected')  
    }
    const element = this.elementRef.nativeElement.querySelector(`.cell-${week}-${cell}`);
    this.renderer.addClass(element, 'selected')
    this._selectedDate$.next({ week, cell });

    const displayTrip =  this.bestTripOption(this.getDate(week, cell)?.id)?.trip
    if((!this.filterValue && displayTrip) || (displayTrip && this.filterValue && this.getPrice(displayTrip?.id) <= this.filterValue)) {
      this._selectedTrip$.next(displayTrip);
      this._filterSelected$.next(false);
      this._alertSelected$.next(false);
    } else {
      if(this.getDate(week, cell)) {
        const alertDate = new Date(this.year, this.month, this.getDate(week, cell)?.day);
        if(alertDate > new Date()) {
          this._alertDate$.next(alertDate);
          this._alertSelected$.next(true);
        }
      }
      this._selectedTrip$.next(undefined);
      this._filterSelected$.next(false);
    }
   }

   /**
    * @description A method to the day of the date
    * @param week The week
    * @param cell The cell
    * @returns {DateCell}
    */
   protected getDate(week: number, cell: number): DateCell {
    const date = week * 7 + cell - this._firstDayOfMonth$.value;
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    if(date > 0 && date <= daysInMonth) {
      return { day: date, id: this._dataCellList$.value.find((element) => element.day === date)?.id };
    }
     return undefined;
   }

   /**
    * @description A method to get the price of an element
    * @param id The id of the trip
    * @returns {number}
    */
   protected getPrice(id: string): number {
      const cheapestOption = this.bestTripOption(id);
      if(cheapestOption)
      {
        const currentRate = this.rates[cheapestOption.currency];
        return Math.round(MoneyUtil.totalPrice(cheapestOption.totalPrice, currentRate) / currentRate)
      }
    return undefined;
   }

   /**
    * @description A method to get the best trip option
    * @param id The id of the trip
    * @returns 
    */
   private bestTripOption(id: string): TripInfo {
    if(id && this.items) {
      return this._elements$.value.filter((element) => element.id === id).map((trip) => {
        let price = 0;
        this.items.itemInformation.forEach(element => {
          const currentRate = this.rates[this.items.currency];
          price += MoneyUtil.getPrice(element, trip, currentRate);
        });
        
        return {
          currency: trip.currency,
          totalPrice: price,
          trip: trip
        };
      })
      .sort((a, b) => a.totalPrice - b.totalPrice)[0];
    } else {
      return undefined;
    }
   }

   /**
    * @description A method to change the month
    * @param month The new month
    */
   private changeMonth(month: number): void {
      this._baseDate$.next(new Date(this.year, month, 1));
      this.month = this._baseDate$.value.getMonth();
      this.year = this._baseDate$.value.getFullYear();
      this._firstDayOfMonth$.next(this._baseDate$.value.getDay() - 1);
      this.monthYearChange.emit(this._baseDate$.value);
      if(this._selectedDate$.value) {
        const oldElement = this.elementRef.nativeElement.querySelector(`.cell-${this._selectedDate$.value.week}-${this._selectedDate$.value.cell}`);
        this.renderer.removeClass(oldElement, 'selected')
        this._selectedDate$.next(undefined);  
      } 
   }

   /**
    * @description A method to go to the previous month
    * @returns {void}
    */
   protected goPreviousMonth(): void {
      this.changeMonth(this.month - 1);
    }

    /**
    * @description A method to go to the next month
    * @returns {void}
    */
   protected goNextMonth(): void {
    this.changeMonth(this.month + 1);
   }

   /**
    * @description A method to close the select trip view
    * @returns {void}
    */
   protected closeSelectTrip(): void {
    this._selectedTrip$.next(undefined);
   }

   /**
    * @description A method to open the filter view
    * @returns {void}
    */
   protected openFilterView(): void {
    this._filterSelected$.next(true);
    this._selectedTrip$.next(undefined);
    this._alertSelected$.next(false);
   }


   /**
    * @description A method to open the alert view
    * @returns {void}
    */
   protected openAlertView(): void {
    this._alertSelected$.next(true);
    this._filterSelected$.next(false);
    this._selectedTrip$.next(undefined);
   }

   /**
    * @description A method to close the filter view
    * @returns {void}
    */
   protected closeFilterView(): void {
    this._filterSelected$.next(false);
   }

   /**
   * @description A method to close the alert view
   * @returns {void}
   */
   protected closeAlertView(): void {
    this._alertSelected$.next(false);
   }
  }