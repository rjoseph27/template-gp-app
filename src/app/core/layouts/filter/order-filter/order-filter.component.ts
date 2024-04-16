import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMAIL_VALIDATION, MAX_LENGTH_VALIDATION, PATTERN_VALIDATION } from "../../../../misc/constants/validations";
import { MIN_DATE_VALIDATION, minDateValidator } from "../../../../misc/validation/min-date.validator";
import { SelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { COUNTRY_SELECTION_OPTIONS } from "../../../../misc/constants/countries/countries.type";
import { Country } from "../../../../misc/enums/country.enum";
import { BehaviorSubject, Observable, map } from "rxjs";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { DateFromDatePicker } from "../../../../misc/util/date.util";

/**
 * @interface OrderFilter
 * @description The order filter
 */
export interface OrderFilter {
    /**
     * @description The email of to filter
     * @type {string}
     */
    email: string;

    /**
     * @description The order to filter
     * @type {string}
     */
    order: string;

    /**
     * @description The delivery date to filter
     * @type {DateFromDatePicker}
     */
    deliveryDate: DateFromDatePicker;

    /**
     * @description The destination country to filter
     * @type {Country}
     */
    destinationCountry: string;

    /**
     * @description The destination region to filter
     * @type {string}
     */
    destinationRegion: string;

    /**
     * @description The origin country to filter
     * @type {Country}
     */
    userCountry: string;

    /**
     * @description The origin region to filter
     * @type {string}
     */
    userRegion: string;

    /**
     * @description The location to filter
     * @type {any}
     */
    location?: any;
}

/**
 * @class GhOrderFilterComponent
 * @description The layout for the order filter
 */
@Component({
    selector: 'gh-order-filter',
    templateUrl: 'order-filter.component.html',
    styleUrls: ['./order-filter.component.scss'],
  })
  export class GhOrderFilterComponent {
    /**
     * @description The label of the order filter
     * @type {string}
     */
    @Input() label: string;

    /**
     * @description The country of the user
     * @type {Country}
     */
    @Input() set country(value: Country) {
        this._defaultCountry$.next(value);
        this._country$.next(value);
      } 
      get userCountry(): Country {
        return this._country$.value;
      }

    /**
    * @description The backing field for the default country
    * @type {BehaviorSubject<Country>}
    */
    protected readonly _defaultCountry$ = new BehaviorSubject<Country>(undefined); 

    /**
     * @description An observable of the default country
     * @type {Observable<Country>}
     */
    protected readonly defaultCountry$: Observable<Country> = this._defaultCountry$.asObservable();
      
    /**
    * @description The name of the email field
    * @type {string}
    */
    protected readonly emailField: string = 'email';

    /**
     * @description The name of the order field
     * @type {string}
     */
    protected readonly orderField: string = 'order';

    /**
     * @description The name of the delivery date field
     * @type {string}
     */
    protected readonly deliveryDateField: string = 'deliveryDate';

    /**
     * @description The name of the country field
     * @type {string}
     */
    protected readonly countryField: string = 'country';

    /**
     * @description The name of the region field
     * @type {string}
     */
    protected readonly regionField: string = 'region';

    /**
     * @description The today date
     * @type {Date}
     */
    protected readonly todayDate = new Date();

    /**
     * @description The order filter form
     * @type {FormGroup}
     */
    protected readonly orderFilterForm = new FormGroup({
        email: new FormControl(null, [Validators.email]),
        order: new FormControl(null, [Validators.maxLength(5), Validators.pattern('^[0-9]*$')]),
        deliveryDate: new FormControl(null, [minDateValidator(this.todayDate)]),
        country: new FormControl(null),
        region: new FormControl(null),
    });

    /**
    * @description The error messages of the email field
    * @type {Map<string, string>}
    */
    protected readonly emailErrorCaptions = new Map<string, string>([
        [EMAIL_VALIDATION, "global.credentials.errors.email.email"],
    ]);

    /**
     * @description The error messages of the order field
     * @type {Map<string, string>}
     */
    protected readonly orderErrorCaptions = new Map<string, string>([
        [MAX_LENGTH_VALIDATION, "orderFilter.form.order.errors.invalid"],
        [PATTERN_VALIDATION, "orderFilter.form.order.errors.invalid"],
    ]);

    /**
     * @description The error messages of the delivery date field
     * @type {Map<string, string>}
     */
    protected readonly deliveryDateErrorCaptions = new Map<string, string>([
        [MIN_DATE_VALIDATION, "orderFilter.form.deliveryDate.errors.invalid"],
    ]);

    /**
     * @description The backing field for the country
     * @type {BehaviorSubject<Country>}
     */
    protected readonly _country$ = new BehaviorSubject<Country>(undefined);
 
    /**
     * @description The country to filter
     * @type {Observable<Country>}
     */
    protected readonly country$: Observable<Country> = this._country$.asObservable();

    /**
     * @description An event emitter for the filter change
     * @type {EventEmitter<OrderFilter>}
     */
    @Output() filterChange = new EventEmitter<OrderFilter>();

    /**
     * @description The options of the country
     * @type {Observable<SelectFieldOption[]>}
     */
    protected readonly countryOptions$ = this.defaultCountry$.pipe(
        map(country => COUNTRY_SELECTION_OPTIONS.filter(x => x.value !== country)));

    /**
     * @description The options of the region
     * @type {Observable<SelectFieldOption[]>}
     */
    protected readonly regionOptions$: Observable<SelectFieldOption[]> = this.country$.pipe(
        map(country => COUNTRY_INFO_LIST.find(x => x.name === country)?.regions.map(key => ({
        value: key,
        label: key,
      }))));

    /**
     * @description Update the country
     * @param {string} value The value of the country
     * @returns {void}
     */
    protected updateCountry(value: string): void {
        if(value !== this.userCountry) {
          this._country$.next(value as Country);
          this.orderFilterForm.get(this.countryField).setValue(value)
          this.orderFilterForm.get(this.regionField).setValue(null);
        }
      }

    /**
     * @description Filter the orders
     * @returns {void}
     */
    protected filterOrders(): void {
        this.filterChange.emit(this.orderFilterForm.value as OrderFilter);
    }      
  }