import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { TIME_ICON } from '../../../../misc/constants/icon';
import { BehaviorSubject } from 'rxjs';
import { Time } from '@angular/common';

/**
 * @interface TimeFromTimePicker
 * @description The time from the time picker
 */
interface TimeFromTimePicker {
  /**
   * @description The Time as a Object
   * @type {Time}
   */
  time: Time;

  /**
   * @description The time as a string
   * @type {string}
   */
  timeString: string;
}

/**
 * @class GhTimeFieldComponent
 * @description The time field component
 */
@Component({
  selector: 'gh-time-field',
  templateUrl: './time-field.component.html',
  styleUrls: ['./time-field.component.scss', './../base-input-field.component.scss']
})
export class GhTimeFieldComponent extends BaseInputFieldComponent<TimeFromTimePicker> {
  /**
   * @description Backing field for isTimePickerOpen$
   * @type {BehaviorSubject<boolean>}
   */
  private readonly _isTimePickerOpen$ = new BehaviorSubject<boolean>(false);

  /**
   * @description An observable that indicates if the time picker is open
   * @type {Observable<boolean>}
   */
  protected readonly isTimePickerOpen$ = this._isTimePickerOpen$.asObservable();
  
  /**
   * @description A reference to the input element.
   * @type {ElementRef}
   */
  @ViewChild('input', { static: true }) input: ElementRef;

  /**
   * @description The value of the date
   * @type {string}
   */
  protected timeValue: string;

  /**
   * @description Backing field for maxTime
   * @type {string}
   */
  protected inputMaxTime: String

  /**
   * @description Backing field for minTime
   * @type {string}
   */
  protected inputMinTime: String

  /**
   * @description The maximum time of the time field
   */
  @Input() set maxDate(time: any) {
    this.inputMaxTime = time;
  }

  /**
   * @description The minimum time of the date field
   */
  @Input() set minDate(time: any) {
    this.inputMinTime = time;
  }
  
  /**
   * @description The input field for the time
   * @type {string}
   */
  protected readonly timeIcon = TIME_ICON;

  /**
   * @description A method that shows the time picker
   * @type {void}
   */
  protected showTimePicker(): void {
    this._isTimePickerOpen$.next(true);
    setTimeout(() => this.input.nativeElement.showPicker(), 0);
  }

  /**
   * @description A method that hides the calendar
   * @type {void}
   */
  protected onTimeChange(event: Event) {
    this.timeValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit({
      time: {
        hours: parseInt(this.timeValue.split(":")[0]), 
        minutes: parseInt(this.timeValue.split(":")[1])},   
      timeString: this.timeValue
    })
    this._isTimePickerOpen$.next(false);
  }

  /**
   * @description A method that emits the value of the time
   * @type {void}
   */
  protected emitValue(event: string): void {
    this.valueChange.emit({
      time: {
        hours: parseInt(event.split(":")[0]), 
        minutes: parseInt(event.split(":")[1])},   
      timeString: event
    })
    this._isTimePickerOpen$.next(false);
  }
}
