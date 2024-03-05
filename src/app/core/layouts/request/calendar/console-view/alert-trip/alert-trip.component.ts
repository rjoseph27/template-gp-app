import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { DateFromDatePicker, DateUtil } from "../../../../../../misc/util/date.util";
import { MIN_DATE_VALIDATION, minDateValidator } from "../../../../../../misc/validation/min-date.validator";
import { MIN_VALIDATION, REQUIRED_VALIDATION } from "../../../../../../misc/constants/validations";
import { INVALID_DATE_FORMAT_VALIDATION, dateFormatValidator } from "../../../../../../misc/validation/date-format.validator";
import { BehaviorSubject } from "rxjs";
import { Currency } from "../../../../../../misc/enums/currency.enum";
import { CurrencyInfo } from "../../../../../../misc/constants/countries/countries.type";
import { Country } from "../../../../../../misc/enums/country.enum";
import { COUNTRY_INFO_LIST } from "../../../../../../misc/constants/countries/countries";
import { ClientRequestsService } from "../../../../../../client/service/requests.service";
import { ClientSendItemsService } from "../../../../../../client/service/send-items.service";

/**
 * @description The from field
 * @type {string}
 */
const FROM_FIELD = 'from';

/**
 * @description The to field
 * @type {string}
 */
const TO_FIELD = 'to';

/**
 * @description The alert date validation
 * @type {string}
 */
const ALERT_DATE_VALIDATION = 'invalidAlertDate';

/**
 * @constant
 * @description A method that validate the alert date
 */
export const alertDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if(control.get(FROM_FIELD).value && control.get(TO_FIELD).value) {
      const departureDate = control.get(FROM_FIELD).value.date;
      const arrivalDate = control.get(TO_FIELD).value.date;
  
     if (arrivalDate < departureDate) {
       control.get(TO_FIELD).setErrors({ invalidAlertDate: true });
       control.get(FROM_FIELD).setErrors({ invalidAlertDate: true });
      } else {
          const toFieldErrors = { ...control.get(TO_FIELD).errors }; 
          delete toFieldErrors[ALERT_DATE_VALIDATION]; 
          control.get(TO_FIELD).setErrors(Object.keys(toFieldErrors).length ? toFieldErrors : null);

          const fromFieldErrors = { ...control.get(FROM_FIELD).errors }; 
          delete fromFieldErrors[ALERT_DATE_VALIDATION]; 
          control.get(FROM_FIELD).setErrors(Object.keys(fromFieldErrors).length ? fromFieldErrors : null);
        }
      }
    
  return null;
};

/**
 * @interface AlertTripCaptions
 * @description The alert trip captions
 */
export interface AlertTripCaptions {
  /**
   * @description The title of the alert trip
   * @type {string}
   */
  title: string,

  /**
   * @description The from field
   * @type {Object}
   */
  from: {
      /**
       * @description The label of the from field
       * @type {string}
       */
      title: string,

      /**
       * @description The errors of the from field
       * @type {Object}
       */
      errors: {
          /**
           * @description The min date error
           * @type {string}
           */
          minDate: string,

          /**
           * @description The invalid date error
           * @type {string}
           */
          invalidDate: string,

          /**
           * @description The invalid alert date error
           * @type {string}
           */
          invalidAlertDate: string
      }
  },
  /**
   * @description The to field
   * @type {Object}
   */   
  to: {
      /**
       * @description The label of the to field
       * @type {string}
       */
      title: string,

      /**
       * @description The errors of the to field
       * @type {Object}
       */
      errors: {
          /**
           * @description The invalid date error
           * @type {string}
           */
          invalidDate: string,

          /**
           * @description The invalid alert date error
           * @type {string}
           */
          invalidAlertDate: string
      }
  },
  /**
   * @description The max price field
   * @type {Object}
   */
  maxPrice: {
      /**
       * @description The label of the max price field
       * @type {string}
       */
      title: string,

      /**
       * @description The errors of the max price field
       * @type {Object}
       */
      errors: {
          /**
           * @description The min error
           * @type {string}
           */
          min: string
      }
  },

  /**
   * @description The alert sent
   * @type {Object}
   */
  alertSent: {
    /**
     * @description The content of the alert sent
     * @type {string}
     */
    content: string,

    /**
     * @description The caption of the button to redirect to the alert page
     * @type {string}
     */
    button: string
  },

  /**
   * @description The caption of the submit button
   */
  button: string
}

/**
 * @class GhAlertTripComponent
 * @description The alert trip component
 */
@Component({
  selector: 'gh-alert-trip',
  templateUrl: './alert-trip.component.html',
  styleUrl: './alert-trip.component.scss'
})
export class GhAlertTripComponent implements OnInit {
   /**
   * @description A method that close the console view
   * @returns void
   */
   @Output() readonly closed = new EventEmitter<void>();

   /**
    * @description The captions of the alert trip
    * @type {AlertTripCaptions}
    */
   @Input() captions: AlertTripCaptions;

   /**
    * @description The default date of the alert view
    * @type {DateFromDatePicker}
    */
   protected defaultDate: DateFromDatePicker;

   /**
   * @description The backing field for alertSent$
   * @type {BehaviorSubject<boolean>}
   */
   private readonly _alertSent$ = new BehaviorSubject<boolean>(false);

   /**
   * @description An observable that indicates if the alert was sent
   * @type {Observable<boolean>}
   */
   protected readonly alertSent$ = this._alertSent$.asObservable();

   /**
    * @description The selected date
    * @type {Date}
    */
   @Input() set selectedDate(value: Date) {
    if(value) {
      this.defaultDate = {
        date: value,
        dateString: DateUtil.formatToDatePicker(value)
      };
    }
   }

   /**
    * @description The currency of the alert trip
    * @type {CurrencyInfo}
    */
   protected currency: CurrencyInfo;
   
   /**
    * @description The country of the alert trip
    * @type {Country}
    */
   @Input() set country(country: Country) {
      this.currency = COUNTRY_INFO_LIST.find(x => x.name === country).currency;
   }

   /**
    * @description The min date
    * @type {Date}
    */
   protected readonly minDate = new Date();

   /**
   * @description The from field
   * @type {string}
   */
   protected readonly fromField = FROM_FIELD;

   /**
   * @description The to field
   * @type {string}
   */
   protected readonly toField = TO_FIELD;

   /**
    * @description The max price field
    * @type {string}
    */
   protected readonly maxPriceField = 'maxPrice';

   /**
    * @description The backing field for loading$
    * @type {BehaviorSubject<boolean>}
    */
   private readonly _loading$ = new BehaviorSubject<boolean>(false);

   /**
   * @description An observable that emits the loading state of the component
   * @type {Observable<boolean>}
   */
   protected readonly loading$ = this._loading$.asObservable();

   /**
   * @description The error messages of the from field
   * @type {Map<string, string>}
   */
   protected fromErrorCaptions: Map<string, string>;

   /**
   * @description The error messages of the to field
   * @type {Map<string, string>}
   */
   protected toErrorCaptions: Map<string, string>;

  /**
   * @description The error messages of the maximum price field
   * @type {Map<string, string>}
   */
  protected maxPriceErrorCaptions: Map<string, string>;

  /**
   * @description The requests service
   * @type {ClientRequestsService}
   */
  private readonly requestsService = inject(ClientRequestsService);

  /**
   * @description The send items service
   * @type {ClientSendItemsService}
   */
  private readonly sendItemsService = inject(ClientSendItemsService);

   /**
    * @description The alert form
    * @type {FormGroup}
    */
   protected readonly alertForm = new FormGroup({
      from: new FormControl(null, [minDateValidator(this.minDate), dateFormatValidator]),
      to: new FormControl(null, [dateFormatValidator]),
      maxPrice: new FormControl(null, [Validators.min(0)])
    }, 
    { validators: [alertDateValidator] }
   )
   
   /** @inheritdoc */
   ngOnInit(): void {
    this.fromErrorCaptions = new Map<string, string>([
      [MIN_DATE_VALIDATION, this.captions.from.errors.minDate],
      [INVALID_DATE_FORMAT_VALIDATION, this.captions.from.errors.invalidDate],
      [ALERT_DATE_VALIDATION, this.captions.from.errors.invalidAlertDate]
     ]);

     this.toErrorCaptions = new Map<string, string>([
      [INVALID_DATE_FORMAT_VALIDATION, this.captions.to.errors.invalidDate],
      [ALERT_DATE_VALIDATION, this.captions.to.errors.invalidAlertDate]
    ]);

    this.maxPriceErrorCaptions = new Map<string, string>([
      [MIN_VALIDATION, this.captions.maxPrice.errors.min]
    ]);
  }

   /**
    * @description A method that close the console view
    * @returns void
    */
   protected close(): void {
     this.closed.emit();
   }

   /**
   * @description The backing field for the sendingDataServer observable
   * @type {BehaviorSubject<boolean>}
   */
  private readonly _sendingDataServer$ = new BehaviorSubject<boolean>(false);

  /**
   * @description An observable that indicates if the data is sending to the server
   * @type {Observable<boolean>}
   */
  protected readonly sendingDataServer$ = this._sendingDataServer$.asObservable();

   /**
   * @description A method that create an alert
   * @returns void
   */
   protected createAlert(): void{
    this.requestsService.createAlert({...this.alertForm.value, items: this.sendItemsService.requests}).then(res => {
      if(res) {
        this._alertSent$.next(true);
        console.log('alert created');
      }
    })
   }

   /**
   * @description A method that go to the alert page
   * @returns void
   */
   protected goAlertPage() {
     console.log('go to alert page');
   }
}
