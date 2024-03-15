import { Component, Input, OnInit, inject } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { INVALID_DATE_FORMAT_VALIDATION, dateFormatValidator } from "../../../misc/validation/date-format.validator";
import { MIN_DATE_VALIDATION, minDateValidator } from "../../../misc/validation/min-date.validator";
import { MIN_VALIDATION } from "../../../misc/constants/validations";
import { DateFromDatePicker } from "../../../misc/util/date.util";
import { CurrencyInfo } from "../../../misc/constants/countries/countries.type";
import { CurrentFormService } from "../../../services/current-form.service";
import { SendItemsRequest } from "../../../client/service/send-items.service";
import { AlertFormType } from "../../../api/requests/requests.type";

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
const alertDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
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
 * @class GhAlertFormComponent
 * @description The layout for the alert form
 */
@Component({
    selector: 'gh-alert-form',
    templateUrl: 'alert-form.component.html',
  })
  export class GhAlertFormComponent implements OnInit {
   /**
    * @description The min date
    * @type {Date}
    */
   protected readonly minDate = new Date();

   /**
   * @description The request
   * @type {SendItemsRequest}
   */
  @Input() request: AlertFormType;

   /**
    * @description The captions of the alert form
    * @type {DateFromDatePicker}
    */
   @Input() defaultDate: DateFromDatePicker;

   /**
    * @description The information of the currency
    * @type {CurrencyInfo}
    */
   @Input() currency: CurrencyInfo

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
    * @description The alert form
    * @type {FormGroup}
    */
   protected get alertForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

   /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);
   
   /** @inheritdoc */
   ngOnInit(): void {
    if(!this.currentFormService.currentForm) {
        this.currentFormService.currentForm = new FormGroup({
            from: new FormControl(this.defaultDate, [minDateValidator(this.minDate), dateFormatValidator]),
            to: new FormControl(this.defaultDate, [dateFormatValidator]),
            maxPrice: new FormControl(null, [Validators.min(0)])
          }, { validators: [alertDateValidator] }
         )   
    } else {
        this.currentFormService.currentForm.addControl(this.fromField, new FormControl(this.request?.from, [minDateValidator(this.minDate), dateFormatValidator]));
        this.currentFormService.currentForm.addControl(this.toField, new FormControl(this.request?.to, [dateFormatValidator]));
        this.currentFormService.currentForm.addControl(this.maxPriceField, new FormControl(this.request?.maxPrice, [Validators.min(0)]));
        this.currentFormService.currentForm.addValidators(alertDateValidator);
    }

  this.fromErrorCaptions = new Map<string, string>([
    [MIN_DATE_VALIDATION, 'global.alertForm.from.errors.minDate'],
    [INVALID_DATE_FORMAT_VALIDATION, 'global.alertForm.from.errors.invalidDate'],
    [MIN_DATE_VALIDATION, 'global.alertForm.from.errors.invalidAlertDate']
   ]);

   this.toErrorCaptions = new Map<string, string>([
    [INVALID_DATE_FORMAT_VALIDATION, 'global.alertForm.to.errors.invalidDate'],
    [ALERT_DATE_VALIDATION, 'global.alertForm.to.errors.invalidAlertDate']
  ]);

  this.maxPriceErrorCaptions = new Map<string, string>([
    [MIN_VALIDATION, 'global.alertForm.maxPrice.errors.min']
  ]);
    }
}