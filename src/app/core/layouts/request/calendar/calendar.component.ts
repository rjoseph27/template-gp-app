import { Component, ElementRef, Input, Renderer2, inject } from "@angular/core";
import { NEXT_PAGE_ICON, PREVIOUS_PAGE_ICON } from "../../../../misc/constants/icon";
import { Month, WeekDays } from "./calendar.enum";
import { BehaviorSubject, map } from "rxjs";
import { ReportTrip } from "../../../../api/requests/requests.type";
import { SendItemsRequest } from "../../../../client/service/send-items.service";
import { MoneyUtil } from "../../../../misc/util/money.util";
import { Unit } from "../report-trip/report.time.constant";

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
    styleUrls: ['./calendar.component.scss']
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
   protected readonly _firstDayOfMonth$ = new BehaviorSubject<number>(this._baseDate$.value.getDay());

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
      return { day: date, id: this._dataCellList$.value.find((element) => element.day + 1 === date)?.id };
    }
     return undefined;
   }

   /**
    * @description A method to get the price of an element
    * @param id The id of the trip
    * @returns {number}
    */
   protected getPrice(id: string): number {
    if(id) {
      const cheapestOption = this._elements$.value.filter((element) => element.id === id).map((trip) => {
        const defaultPrice = trip.defaultPrice;
        let price = 0;
        this.items.itemInformation.forEach(element => {
         const specificPrice = trip.specificPrice.find((price) => price.category === element.itemCategory);
          if(specificPrice) {
            if(specificPrice.unit === Unit.perKg)
            {
              price += element.itemWeight * specificPrice.price * element.itemQuantity;
            } else {
              price += specificPrice.price * element.itemQuantity;
            }
          } else {
            price += element.itemWeight * defaultPrice * element.itemQuantity;
          }
        });

        return {
          currency: trip.currency,
          totalPrice: price
        };
      })
      .sort((a, b) => a.totalPrice - b.totalPrice)[0];

      const currentRate = this.rates[cheapestOption.currency];
      return MoneyUtil.totalPrice(cheapestOption.totalPrice, currentRate)
    }
    return undefined;
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
  }