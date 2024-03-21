import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { Country } from "../../../misc/enums/country.enum";
import { BehaviorSubject, Observable, map } from "rxjs";
import { EMAIL_VALIDATION } from "../../../misc/constants/validations";
import { MIN_DATE_VALIDATION } from "../../../misc/validation/min-date.validator";
import { COUNTRY_SELECTION_OPTIONS } from "../../../misc/constants/countries/countries.type";
import { OrderFilter } from "./order-filter/order-filter.component";
import { FormGroup } from "@angular/forms";

/**
 * @class BaseFilterComponent
 * @description The base filter component
 */
@Directive()
export abstract class BaseFilterComponent {
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
    * @description The error messages of the email field
    * @type {Map<string, string>}
    */
    protected readonly emailErrorCaptions = new Map<string, string>([
        [EMAIL_VALIDATION, "global.credentials.errors.email.email"],
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
    * @description The form of the filter
    * @type {FormGroup}
    */
    protected abstract form: FormGroup
    
    /**
    * @description The options of the country
    * @type {Observable<SelectFieldOption[]>}
    */
    protected readonly countryOptions$ = this.defaultCountry$.pipe(
        map(country => COUNTRY_SELECTION_OPTIONS.filter(x => x.value !== country)));
        
            
    /**
     * @description Filter the orders
     * @returns {void}
     */
    protected filterOrders(): void {
        this.filterChange.emit(this.form.value as OrderFilter);
    }
    
}