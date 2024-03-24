import { Component, Input, OnInit, inject } from "@angular/core";
import { CurrentFormService } from "../../../../services/current-form.service";
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FormMode } from "../../../../misc/enums/form-mode.enum";
import { MIN_DATE_VALIDATION, minDateValidator } from "../../../../misc/validation/min-date.validator";
import { INVALID_DATE_FORMAT_VALIDATION, dateFormatValidator } from "../../../../misc/validation/date-format.validator";
import { INVALID_TIME_FORMAT_VALIDATION, timeFormatValidator } from "../../../../misc/validation/time-format.validator";
import { FLIGHT_TIME_INVALID } from "../report-trip/report.time.constant";
import { REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { MAX_DATE_VALIDATION, maxDateValidator } from "../../../../misc/validation/max-date.validator";
import { SelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { COUNTRY_SELECTION_OPTIONS } from "../../../../misc/constants/countries/countries.type";
import { BehaviorSubject } from "rxjs";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { CLOSE_ICON } from "../../../../misc/constants/icon";
import { Country } from "../../../../misc/enums/country.enum";
import { DateFromDatePicker } from "../../../../misc/util/date.util";
import { TimeFromTimePicker } from "../../../elements/input/time-field/time-field.component";
import { ArrayUtil } from "../../../../misc/util/array.util";

/**
 * @interface Layovers
 * @description The interface layovers
 */
export interface Layovers {
  /**
   * @description The country
   * @type {Country}
   */
  country: Country;

  /**
   * @description The airport
   * @type {string}
   */
  airport: string;

  /**
   * @description The arrival date
   * @type {Date}
   */
  arrivalDate: DateFromDatePicker;

  /**
   * @description The arrival time
   * @type {Time}
   */
  arrivalTime: TimeFromTimePicker;

  /**
   * @description The departure date
   * @type {Date}
   */
  departureDate: DateFromDatePicker;

  /**
   * @description The departure time
   * @type {Time}
   */
  departureTime: TimeFromTimePicker;
 }

/**
 * @class GhCreateLayoverComponent
 * @description The layout for the create layover
 */
@Component({
    selector: 'gh-create-layover',
    templateUrl: './create-layover.component.html',
    styleUrl: './create-layover.component.scss',
  })
  export class GhCreateLayoverComponent implements OnInit {
    /**
    * @description The current form service
    * @type {CurrentFormService}
    */
    private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

    /**
     * @description The layover field
     * @type {string}
     */
    private readonly layoverField = 'layover';

    /**
     * @description The layout form control
     * @type {FormArray}
     */
    protected get layoutFormControl() {
      return this.currentFormService.currentForm.get(this.layoverField) as FormArray;
    }

    /**
    * @description The backing field for the airport
    * @type {BehaviorSubject<Map<number,SelectFieldOption[]>>} 
    */
    private readonly _airport$ = new BehaviorSubject<Map<number,SelectFieldOption[]>>(new Map<number,SelectFieldOption[]>());

    /**
     * @description The observable of the airport
     * @type {Observable<Map<number,SelectFieldOption[]>>}
     */
    protected readonly airport$ = this._airport$.asObservable();

    /**
     * @description The country field
     * @type {string}
     */
    protected readonly countryField = 'country';

    /**
     * @description The airport field
     * @type {string}
     */
    protected readonly airportField = 'airport';

    /**
     * @description The arrival date field
     * @type {string}
     */
    protected readonly arrivalDateField = 'arrivalDate';

    /**
     * @description The arrival time field
     * @type {string}
     */
    protected readonly arrivalTimeField = 'arrivalTime';

    /**
     * @description The departure date field
     * @type {string}
     */
    protected readonly departureDateField = 'departureDate';

    /**
     * @description The departure time field
     * @type {string}
     */
    protected readonly departureTimeField = 'departureTime';

    /**
    * @description The form mode enum for template use.
    * @type {FormMode}
    */
    protected readonly formMode = FormMode;

    /**
    * @description The options of the country
    * @type {SelectFieldOption[]}
    */
    protected readonly userCountryOptions: SelectFieldOption[] = COUNTRY_SELECTION_OPTIONS;

    /**
     * @description Backing field for duplicatedRouteErrorMessage$
     * @type {BehaviorSubject<string>}
     */
    private readonly _duplicatedRouteErrorMessage$ = new BehaviorSubject<string>(null);

    /**
     * @description An observable that indicates if the route is duplicated
     * @type {Observable<string>}
     */
    protected readonly duplicatedRouteErrorMessage$ = this._duplicatedRouteErrorMessage$.asObservable();

    /**
     * @description Backing field for wrongOrderDateErrorMessage$
     * @type {BehaviorSubject<string>}
     */
    private readonly _wrongOrderDateErrorMessage$ = new BehaviorSubject<string>(null);

    /**
     * @description An observable that indicates if the date order is wrong
     * @type {Observable<string>}
     */
    protected readonly wrongOrderDateErrorMessage$ = this._wrongOrderDateErrorMessage$.asObservable();

    /**
     * @description Backing field for intersectingDateErrorMessage$
     * @type {BehaviorSubject<string>}
     */
    private readonly _intersectingDateErrorMessage$ = new BehaviorSubject<string>(null);

    /**
     * @description An observable that indicates if the date is intersecting
     * @type {Observable<string>}
     */
    protected readonly intersectingDateErrorMessage$ = this._intersectingDateErrorMessage$.asObservable();

    /**
   * @description The error messages for the country field
   * @type {Map<string, string>}
   */
  protected readonly countryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "sendItems.location.country.errors.required"],
  ]);

    /**
    * @description The form mode
    * @type {FormMode}
    */
    @Input() currentFormMode: FormMode;

    /**
     * @description The min date
     * @type {Date}
     */
    @Input() minDate: Date;

    /**
     * @description The max date
     * @type {Date}
     */
    @Input() maxDate: Date;

    /**
     * @description The origin airport
     * @type {string}
     */
    @Input() originAirport: string

    /**
     * @description The destination airport
     * @type {string}
     */
    @Input() destinationAirport: string

    /**
     * @description The close icon
     * @type {string}
     */
    protected readonly closeIcon = CLOSE_ICON

    /**
   * @description The error messages for the airport field
   * @type {Map<string, string>}
   */
  protected readonly airportErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "reportTrip.airport.errors.required"],
  ]);

  /**
   * @description The error messages for the departure date field
   * @type {Map<string, string>}
   */
  protected readonly dateErrorCaptions = new Map<string, string>([
    [INVALID_DATE_FORMAT_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.invalidFormat"],
    [MIN_DATE_VALIDATION, "reportTrip.date.errors.invalidDate"],
    [MAX_DATE_VALIDATION, "reportTrip.date.errors.invalidDate"],
    [FLIGHT_TIME_INVALID, "reportTrip.date.errors.invalidFlightTime"]
  ]);

  /**
   * @description The error messages for the departure time field
   * @type {Map<string, string>}
   */
  protected readonly timeErrorCaptions = new Map<string, string>([
    [INVALID_TIME_FORMAT_VALIDATION, "reportTrip.date.errors.invalidTime"],
    [FLIGHT_TIME_INVALID, "reportTrip.date.errors.invalidFlightTime"]
  ]);

  /**
   * @description The duplicate route validator
   * @type {ValidatorFn}
   */
  private readonly duplicateRouteValidator: ValidatorFn = (control: AbstractControl) => {
    const route = [...(<Layovers[]>control.value.layover).map(x => x.airport), this.originAirport, this.destinationAirport];
    const set = new Set(route);
    if(set.size !== route.length) {
      control.get(this.layoverField).setErrors({ duplicateRoute: true });
      this._duplicatedRouteErrorMessage$.next("createLayover.form.errors.duplicatedRoute");
    } else {
      const errors = { ...control.get(this.layoverField).errors }; 
      delete errors['duplicateRoute']; 
      control.get(this.layoverField).setErrors(Object.keys(errors).length ? errors : null);
      this._duplicatedRouteErrorMessage$.next(null);
    }
    return null;
  }

  /**
   * @description The wrong date order validator
   * @type {ValidatorFn}
   */
  private readonly wrongDateOrderValidator: ValidatorFn = (control: AbstractControl) => {
    const dates: Date[] = [this.minDate,...(<Layovers[]>control.value.layover).map(x => {
      const date = new Date(x.arrivalDate?.date);
      date.setHours(x.arrivalTime?.time.hours);
      date.setMinutes(x.arrivalTime?.time.minutes);
      return date
    }), this.maxDate];

    const orderedDates = [...dates].sort((a,b) => a.getTime() - b.getTime());
    if(!ArrayUtil.arraysAreEqual(dates, orderedDates)) {
      control.get(this.layoverField).setErrors({ wrongDateOrder: true });
      this._wrongOrderDateErrorMessage$.next("createLayover.form.errors.wrongOrderDate");
    } else {
      const errors = { ...control.get(this.layoverField).errors }; 
      delete errors['wrongDateOrder']; 
      control.get(this.layoverField).setErrors(Object.keys(errors).length ? errors : null);
      this._wrongOrderDateErrorMessage$.next(null);
    }
    return null;
  }

  /**
   * @description The intersecting date validator
   * @type {ValidatorFn}
   */
  private readonly intersectingDateValidator: ValidatorFn = (control: AbstractControl) => {
    let isDateIntersect = false;
    <Layovers[]>control.value.layover.forEach((layover: Layovers, index: number) => {
      if(index > 0) {
        const arrivalDate = new Date(layover.arrivalDate?.date.toString());
        arrivalDate.setHours(layover.arrivalTime?.time.hours, layover.arrivalTime?.time.minutes);

        const lastDepartureDate = new Date(control.value.layover[index - 1].departureDate.date.toString());
        lastDepartureDate.setHours(control.value.layover[index - 1].departureTime.time.hours, control.value.layover[index - 1].departureTime.time.minutes);
        if(arrivalDate.getTime() < lastDepartureDate.getTime()) {
          isDateIntersect = true;
        }
      }
    })

    if(isDateIntersect) {
      control.get(this.layoverField).setErrors({ intersectingDate: true });
      this._intersectingDateErrorMessage$.next("createLayover.form.errors.intersectingDate");
    } else {
      const errors = { ...control.get(this.layoverField).errors }; 
      delete errors['intersectingDate']; 
      this._intersectingDateErrorMessage$.next(null);
      control.get(this.layoverField).setErrors(Object.keys(errors).length ? errors : null);
    }
    return null;
  }

  /**
   * @description The flight time validator
   * @type {ValidatorFn}
   */
  private readonly flighTimeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if(
        control.get(this.arrivalDateField)?.value && 
        control.get(this.arrivalTimeField)?.value && 
        control.get(this.departureDateField)?.value && 
        control.get(this.departureTimeField)?.value)
    {
        let arrivalDate = new Date(control.get(this.arrivalDateField).value.date.toString());
        if(typeof arrivalDate === 'string') {
            arrivalDate = new Date(arrivalDate);
        }
        arrivalDate.setHours(control.get(this.arrivalTimeField).value.time.hours);
        arrivalDate.setMinutes(control.get(this.arrivalTimeField).value.time.minutes);
        let departureDate = new Date(control.get(this.departureDateField).value.date.toString());
        if(typeof departureDate === 'string') {
          departureDate = new Date(departureDate);
        }
        departureDate?.setHours(control.get(this.departureTimeField).value.time.hours);
        departureDate?.setMinutes(control.get(this.departureTimeField).value.time.minutes);

       if (departureDate < arrivalDate) {
         control.get(this.departureTimeField).setErrors({ invalidFlightDate: true });
          control.get(this.departureDateField).setErrors({ invalidFlightDate: true });
        } else {
          const arrivalTimeFieldErrors = { ...control.get(this.departureTimeField).errors }; 
          delete arrivalTimeFieldErrors[FLIGHT_TIME_INVALID]; 
          control.get(this.departureTimeField).setErrors(Object.keys(arrivalTimeFieldErrors).length ? arrivalTimeFieldErrors : null);

          const fromFieldErrors = { ...control.get(this.departureDateField).errors }; 
          delete fromFieldErrors[FLIGHT_TIME_INVALID]; 
          control.get(this.departureDateField).setErrors(Object.keys(fromFieldErrors).length ? fromFieldErrors : null);
      }
     }
      
    return null;
  };
    
  /** @inheritdoc */
  ngOnInit(): void {
    if(!this.currentFormService.currentForm) {
      this.currentFormService.currentForm = new FormGroup({ layover: new FormArray([])}, { validators: [this.duplicateRouteValidator, this.wrongDateOrderValidator, this.intersectingDateValidator] })  
    } else {
      this.currentFormService.currentForm.addControl(this.layoverField, new FormArray([]));
      this.currentFormService.currentForm.addValidators([this.duplicateRouteValidator, this.wrongDateOrderValidator, this.intersectingDateValidator]);   
    }
   }
   
   /**
     * @description A method that add a layover
     * @returns void
     */
   protected addLayover(): void {
    const index = this.layoutFormControl.length;
    const maxDate = new Date(this.maxDate.toString());
    maxDate.setHours(23);
    maxDate.setMinutes(59);
    const minDate = new Date(this.minDate.toString());
    minDate.setHours(0);
    minDate.setMinutes(0);
    this.layoutFormControl.push(new FormGroup({}, { validators: [this.flighTimeValidator]}));
    (this.layoutFormControl.at(index) as FormGroup).addControl(this.countryField, new FormControl(null, [Validators.required]));
    (this.layoutFormControl.at(index) as FormGroup).addControl(this.airportField, new FormControl(null, [Validators.required]));
    (this.layoutFormControl.at(index) as FormGroup).addControl(this.arrivalDateField, new FormControl(null, [Validators.required, dateFormatValidator, minDateValidator(minDate), maxDateValidator(maxDate)]));
    (this.layoutFormControl.at(index) as FormGroup).addControl(this.arrivalTimeField, new FormControl(null, [Validators.required, timeFormatValidator]));
    (this.layoutFormControl.at(index) as FormGroup).addControl(this.departureDateField, new FormControl(null, [Validators.required, dateFormatValidator, minDateValidator(minDate), maxDateValidator(maxDate)]));
    (this.layoutFormControl.at(index) as FormGroup).addControl(this.departureTimeField, new FormControl(null, [Validators.required, timeFormatValidator]));
  }

  /**
   * @description A method to track the index
   * @param index The index of the layover
   * @param value The value of the layover
   * @returns number
   */
  protected trackByIndex(index: number, value: any): number{
    return index;
  }

  /**
   * @description A method to update the country and airport of a layover
   * @param value The new country value
   * @param index The index of the layover
   */
  protected updateCountry(value: string, index: number): void {
    this.layoutFormControl.at(index).get(this.countryField).setValue(value)
    this.layoutFormControl.at(index).get(this.airportField).setValue(null)
    const airports = this._airport$.value;
    airports.set(index, COUNTRY_INFO_LIST.find(x => x.name === value)?.airports.map(key => ({
      value: key.code,
      label: key.code + " - "+ key.name,
    })));
    this._airport$.next(airports);
    }

    /**
     * @description A method to delete a layover
     * @param index The index of the layover
     * @returns void
     */
    protected deleteLayover(index: number): void {
      this.layoutFormControl.removeAt(index);
      const airports = this._airport$.value;
      airports.delete(index);
      this._airport$.next(airports);
    }
  }