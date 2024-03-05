import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { CALENDAR_ICON } from '../../../../misc/constants/icon';
import { DateFromDatePicker, DateUtil } from '../../../../misc/util/date.util';
import { BehaviorSubject } from 'rxjs';

/**
 * @component GhDateFieldComponent
 * @description The date field component that will be use throughout the application
 */
@Component({
  selector: 'gh-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss', './../base-input-field.component.scss']
})
export class GhDateFieldComponent extends BaseInputFieldComponent<DateFromDatePicker> {
  /**
   * @description Backing field for isCalendarOpen$
   * @type {BehaviorSubject<boolean>}
   */
  private readonly _isCalendarOpen$ = new BehaviorSubject<boolean>(false);

  /**
   * @description An observable that indicates if the calendar is open
   * @type {Observable<boolean>}
   */
  protected readonly isCalendarOpen$ = this._isCalendarOpen$.asObservable();
  
  /**
   * @description A reference to the input element.
   * @type {ElementRef}
   */
  @ViewChild('input', { static: true }) input: ElementRef;

  /**
   * @description The value of the date
   * @type {string}
   */
  protected dateValue: string 

  /**
   * @description Backing field for maxDate
   * @type {string}
   */
  protected inputMaxDate: String

  /**
   * @description Backing field for minDate
   * @type {string}
   */
  protected inputMinDate: String

  /**
   * @description The maximum date of the date field
   */
  @Input() set maxDate(date: Date) {
    this.inputMaxDate = DateUtil.formatToDatePicker(date);
  }

  /**
   * @description The minimum date of the date field
   */
  @Input() set minDate(date: Date) {
    this.inputMinDate = DateUtil.formatToDatePicker(date);
  }
  
  /**
   * @description The input field for the date
   * @type {string}
   */
  protected readonly calendarIcon = CALENDAR_ICON;

  /**
   * @description A method that shows the calendar
   * @type {void}
   */
  protected showCalendar(): void {
    this._isCalendarOpen$.next(true);
    setTimeout(() => this.input.nativeElement.showPicker(), 0);
  }

  /**
   * @description A method that hides the calendar
   * @type {void}
   */
  protected onDateChange(event: Event) {
    this.dateValue = new Date((event.target as HTMLInputElement).value).toISOString().split('T')[0];
    this.valueChange.emit({
      date: new Date(this.dateValue),
      dateString: this.dateValue
    })
    this._isCalendarOpen$.next(false);
  }

  /**
   * @description A method that emits the value of the date
   * @type {void}
   */
  protected emitValue(event: string): void {
    this.valueChange.emit({
      date: event ? new Date(event) : undefined,
      dateString: event
    })
    this._isCalendarOpen$.next(false);
  }
}
