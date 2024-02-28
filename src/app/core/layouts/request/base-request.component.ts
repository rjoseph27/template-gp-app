import { Directive, Input, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { Country } from "../../../misc/enums/country.enum";
import { BehaviorSubject, Observable, map } from "rxjs";
import { SelectFieldOption } from "../../elements/input/select-field/select-field.component";
import { COUNTRY_SELECTION_OPTIONS } from "../../../misc/constants/countries/countries.type";
import { REQUIRED_VALIDATION } from "../../../misc/constants/validations";

/**
 * @class BaseRequestComponent
 * @description The base request component
 */
@Directive() 
export class BaseRequestComponent  {
   /**
   * @description The current form service
   * @type {CurrentFormService}
   */
   protected readonly currentFormService: CurrentFormService = inject(CurrentFormService);

   /**
   * @description backing field for the destination country
   * @type {BehaviorSubject<Country>}
   */
  protected readonly _destinationCountry$ = new BehaviorSubject<Country>(undefined);

  /**
   * @description An observable of the destination country
   * @type {Observable<Country>}
   */
  protected readonly destinationCountry$: Observable<Country> = this._destinationCountry$.asObservable();


   /**
   * @description The name of the user country field.
   * @type {string}
   */
  protected readonly userCountryField = 'userCountry';
 
   /**
    * @description The country of the user
    * @type {Country}
    */
   @Input() set userCountry(value: Country) {
     this._userCountry$.next(value);
   } 
   get userCountry(): Country {
     return this._userCountry$.value;
   }
 
   /**
    * @description backing field for the user country
    * @type {BehaviorSubject<Country>}
    */
   protected readonly _userCountry$ = new BehaviorSubject<Country>(undefined);
 
   /**
    * @description An observable of the user country
    * @type {Observable<Country>}
    */
   protected readonly userCountry$: Observable<Country> = this._userCountry$.asObservable();

   /**
   * @description The options of the destinations country
   * @type {Observable<SelectFieldOption[]>}
   */
  protected readonly destinationCountryOptions$ = this.userCountry$.pipe(map(country => COUNTRY_SELECTION_OPTIONS.filter(x => x.value !== country)));

  /**
   * @description An observable of the loading state
   * @type {Observable<boolean>}
   */
  protected readonly loading$ = this.currentFormService.submitting$;
   
   /**
   * @description The options of the country
   * @type {SelectFieldOption[]}
   */
  protected readonly userCountryOptions: SelectFieldOption[] = COUNTRY_SELECTION_OPTIONS;

  /**
   * @description The error messages for the country field
   * @type {Map<string, string>}
   */
  protected readonly countryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.location.country.errors.required"],
  ]);
}