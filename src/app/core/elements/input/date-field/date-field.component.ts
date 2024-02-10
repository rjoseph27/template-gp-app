import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { CALENDAR_ICON } from '../../../../misc/constants/icon';
import { DateUtil } from '../../../../misc/util/date.util';

@Component({
  selector: 'gh-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss', './../base-input-field.component.scss']
})
export class GhDateFieldComponent extends BaseInputFieldComponent<Date> {
  /**
   * @description A reference to the input element.
   * @type {ElementRef}
   */
  @ViewChild('input', { static: true }) input: ElementRef;

  /**
   * @description The value of the date
   * @type {string}
   */
  protected dateValue: string;

  /**
   * @description Backing field for maxDate
   * @type {string}
   */
  protected inputMaxDate: String

  /**
   * @description The maximum date of the date field
   */
  @Input() set maxDate(date: Date) {
    this.inputMaxDate = DateUtil.formatToDatePicker(date);
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
    this.input.nativeElement.showPicker();
  }

  /**
   * @description A method that hides the calendar
   * @type {void}
   */
  protected onDateChange(event: Event) {
    this.dateValue = new Date((event.target as HTMLInputElement).value).toISOString().split('T')[0];
    this.valueChange.emit(new Date(this.dateValue))
  }

  protected emitValue(event: string) {
    this.valueChange.emit(new Date(event));
  }
}
