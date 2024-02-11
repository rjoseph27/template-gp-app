import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { PhoneInfo } from '../../../../misc/constants/countries';
import { BehaviorSubject, Subject, tap } from 'rxjs';

/**
 * @class GhPhoneFieldComponent
 * @description The phone field component
 */
@Component({
  selector: 'gh-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss', './../base-input-field.component.scss']
})
export class GhPhoneFieldComponent extends BaseInputFieldComponent<string> {
  /**
   * @description backing field for value$
   * @type {BehaviorSubject<string>}
   */
  private readonly _value$ = new BehaviorSubject<string>(undefined);

  /**
   * @description An observable that emits the value of the input field
   * @type {Observable<string>}
   */
  protected readonly value$ = this._value$.asObservable();

  /**
   * @description the backing field for phoneInfo
   * @type {PhoneInfo}
   */
  private _phoneInfo: PhoneInfo;

  /**
   * @description The phone info of the phone field
   * @type {PhoneInfo}
   */
  @Input() set phoneInfo(value: PhoneInfo) {
    if(value)
    {
      this._value$.next("")
      this._phoneInfo = value;
      this.formattedValue = value.code+" "+value.phoneFormat;
      setTimeout(() => {
        this.formattedValueChange.emit("");
      },0);
    }
  } get phoneInfo(): PhoneInfo {
    return this._phoneInfo;
  }

  /**
   * @description The value of the phone field
   * @type {string}
   */
  protected formattedValue: string;

  /**
   * @description An event emitter for the formatted value change
   * @type {EventEmitter<string>}
   */
  @Output() formattedValueChange = new EventEmitter<string>();

  /**
   * @description Show the format of the phone number according to the current country
   * @param event the initial value of the phone number
   * @type {void}
   */
  protected emitValue(event: string): void {
    const transformValue = this.phoneInfo.phoneFormat.split('');
    this._value$.next(event.replace(/\s/g, "").replace(/-/g, ""))
    for(let i = 0; i < this._value$.value.length; i++) {
      let index = transformValue.indexOf('_')
      if(index < transformValue.length) {
        transformValue[index] = this._value$.value[i];
      }
    }
    this.formattedValue = this.phoneInfo.code+" "+transformValue.join('');
    this.formattedValueChange.emit(this.formattedValue);
  }
}
