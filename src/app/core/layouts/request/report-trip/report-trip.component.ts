import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Country } from "../../../../misc/enums/country.enum";
import { BaseRequestComponent } from "../base-request.component";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { map } from "rxjs/operators";
import { REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { INVALID_DATE_FORMAT_VALIDATION, dateFormatValidator } from "../../../../misc/validation/date-format.validator";
import { DateUtil } from "../../../../misc/util/date.util";
import { MIN_DATE_VALIDATION, minDateValidator } from "../../../../misc/validation/min-date.validator";
import { INVALID_TIME_FORMAT_VALIDATION, timeFormatValidator } from "../../../../misc/validation/time-format.validator";

/**
 * @class GhReportTripComponent
 * @description The layout of for the report trip component
 */
@Component({
  selector: 'gh-report-trip',
  templateUrl: './report-trip.component.html',
  styleUrl: './report-trip.component.scss',
})
export class GhReportTripComponent extends BaseRequestComponent implements OnInit { 
  /**
   * @description The report trip form
   * @type {FormGroup}
   */
  protected get reportTripForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

  /**
   * @description The name of the user airport field.
   * @type {string}
   */
  protected readonly userAirportField = 'userAirport';

  /**
   * @description The name of the departure date field.
   * @type {string}
   */
  protected readonly departureDatetField = 'departureDate';

  /**
   * @description The name of the departure time field.
   * @type {string}
   */
  protected readonly departureTimeField = 'departureTime'

  /**
   * @description The minimum departure date
   * @type {Date}
   */
  protected readonly minDepartureDate = DateUtil.addDaysFromDate(new Date(), 1);

  /**
   * @description An obervable of the options for the user country airports
   * @type {Observable<SelectFieldOption[]>}
   */
  protected readonly userAirports$ = this.userCountry$.pipe(
    map(country => COUNTRY_INFO_LIST.find(x => x.name === country)?.airports.map(key => ({
    value: key.code,
    label: key.code + " - "+ key.name,
  }))));

  /**
   * @description The error messages for the airport field
   * @type {Map<string, string>}
   */
  protected readonly airportErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.gp.reportTrip.airport.errors.required"],
  ]);

  /**
   * @description The error messages for the departure date field
   * @type {Map<string, string>}
   */
  protected readonly departureDateErrorCaptions = new Map<string, string>([
    [INVALID_DATE_FORMAT_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.invalidFormat"],
    [MIN_DATE_VALIDATION, "moduleList.gp.reportTrip.date.errors.invalidDate"],
  ]);

  /**
   * @description The error messages for the departure time field
   * @type {Map<string, string>}
   */
  protected readonly departureTimeErrorCaptions = new Map<string, string>([
    [INVALID_TIME_FORMAT_VALIDATION, "moduleList.gp.reportTrip.date.errors.invalidTime"],
  ]);

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.currentForm = new FormGroup({
      userCountry: new FormControl(this.userCountry, [Validators.required]),
      userAirport: new FormControl(null, [Validators.required]),
      departureDate: new FormControl(null, [Validators.required, dateFormatValidator, minDateValidator(this.minDepartureDate)]),
      departureTime: new FormControl(null, [Validators.required, timeFormatValidator]),
    });
  }

  /**
   * @description Updates the user country
   * @param value The new value of the user country
   * @returns {void}
   */
  protected updateUserCountry(value: string): void {
    this._userCountry$.next(value as Country);
    this.reportTripForm.get(this.userCountryField).setValue(value)
    this.reportTripForm.get(this.userAirportField).setValue(undefined);
  }
}
