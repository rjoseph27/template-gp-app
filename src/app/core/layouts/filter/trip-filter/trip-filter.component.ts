import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAX_LENGTH_VALIDATION, PATTERN_VALIDATION } from "../../../../misc/constants/validations";
import { minDateValidator } from "../../../../misc/validation/min-date.validator";
import { Country } from "../../../../misc/enums/country.enum";
import { map } from "rxjs";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { BaseFilterComponent } from "../base-filter.component";

/**
 * @class GhTripFilterComponent
 * @description The trip filter component
 */
@Component({
    selector: 'gh-trip-filter',
    templateUrl: 'trip-filter.component.html',
    styleUrls: ['./trip-filter.component.scss'],
  })
  export class GhTripFilterComponent extends BaseFilterComponent {
    /**
     * @description The order filter form
     * @type {FormGroup}
     */
    protected readonly form = new FormGroup({
        email: new FormControl(null, [Validators.email]),
        order: new FormControl(null, [Validators.maxLength(5)]),
        deliveryDate: new FormControl(null, [minDateValidator(this.todayDate)]),
        country: new FormControl(null),
        region: new FormControl(null),
    });

    /**
     * @description The error messages of the order field
     * @type {Map<string, string>}
     */
    protected readonly orderErrorCaptions = new Map<string, string>([
        [MAX_LENGTH_VALIDATION, "orderFilter.form.order.errors.invalid"],
        [PATTERN_VALIDATION, "orderFilter.form.order.errors.invalid"],
    ]);


   /**
   * @description An obervable of the options for the destination country airports
   * @type {Observable<SelectFieldOption[]>}
   */
  protected readonly destinationAirports$ = this.country$.pipe(
    map(country => COUNTRY_INFO_LIST.find(x => x.name === country)?.airports.map(key => ({
      value: key.code,
      label: key.code + " - "+ key.name,
    }))));

    /**
     * @description Update the country
     * @param {string} value The value of the country
     * @returns {void}
     */
    protected updateCountry(value: string): void {
        if(value !== this.userCountry) {
          this._country$.next(value as Country);
          this.form.get(this.countryField).setValue(value)
          this.form.get(this.regionField).setValue(null);
        }
      }      
  }