import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Country } from "../../../../misc/enums/country.enum";
import { BaseRequestComponent } from "../base-request.component";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { map, tap } from "rxjs/operators";
import { MIN_VALIDATION, REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { INVALID_DATE_FORMAT_VALIDATION, dateFormatValidator } from "../../../../misc/validation/date-format.validator";
import { DateUtil } from "../../../../misc/util/date.util";
import { MIN_DATE_VALIDATION, minDateValidator } from "../../../../misc/validation/min-date.validator";
import { INVALID_TIME_FORMAT_VALIDATION, timeFormatValidator } from "../../../../misc/validation/time-format.validator";
import { ColumnConfig } from "../../../elements/table/table.component";
import { BehaviorSubject } from "rxjs";
import { GroupedSelectFieldOption, SelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { LIST_ITEM_CATEGORY_OPTION } from "../../../../misc/constants/item-category";
import { EnumUtil } from "../../../../misc/util/enum.util";
import { ARRIVAL_DATE, ARRIVAL_TIME, DEPARTURE_DATE, DEPARTURE_TIME, EMPTY_TABLE_LOGO, FLIGHT_TIME_INVALID, SpecificPrice, Unit, flighTimeValidator } from "./report-trip.constant";
import { FormMode } from "../../../../misc/enums/form-mode.enum";
import { ReportTrip } from "../../../../api/requests/requests.type";

/**
 * @class GhReportTripComponent
 * @description The layout of for the report trip component
 */
@Component({
  selector: 'gh-report-trip',
  templateUrl: './report-trip.component.html',
  styleUrl: './report-trip.component.scss',
})
export class GhReportTripComponent extends BaseRequestComponent implements OnInit, AfterViewInit {
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
  protected readonly departureDateField = DEPARTURE_DATE;

  /**
   * @description The name of the departure time field.
   * @type {string}
   */
  protected readonly departureTimeField = DEPARTURE_TIME

  /**
   * @description The name of the destination country field.
   * @type {string}
   */
  protected readonly destinationCountryField = 'destinationCountry'

  /**
   * @description The name of the destination airport field.
   * @type {string}
   */
  protected readonly destinationAirportField = 'destinationAirport'

  /**
   * @description The name of the arrival date field.
   * @type {string}
   */
  protected readonly arrivalDateField = ARRIVAL_DATE

  /**
   * @description The name of the arrival time field.
   * @type {string}
   */
  protected readonly arrivalTimeField = ARRIVAL_TIME

  /**
   * @description The name of the available space field.
   * @type {string}
   */
  protected readonly availableSpaceField = 'availableSpace'

  /**
   * @description The name of the default price field.
   * @type {string}
   */
  protected readonly defaultPriceField = 'defaultPrice'

  /**
   * @description The minimum departure date
   * @type {Date}
   */
  protected readonly minDepartureDate = new Date();

  /**
   * @description The currency of the user
   * @type {string}
   */
  protected readonly userCurrency$ = this.defaultUserCountry$.pipe(map(country => COUNTRY_INFO_LIST.find(x => x.name === country)?.currency));

  /**
   * @description The specific price table columns
   * @type {BehaviorSubject<ColumnConfig[]>}
   */
  private readonly _specificPriceTableColumns$ = new BehaviorSubject<ColumnConfig[]>(undefined);

  /**
   * @description The form mode
   * @type {FormMode}
   */
  @Input() currentFormMode: FormMode;

  /**
   * @description The report trip
   * @type {ReportTrip}
   */
  @Input() reportTrip: ReportTrip;

  /**
   * @description The form mode enum for template use.
   * @type {FormMode}
   */
  protected readonly formMode = FormMode;

  /**
   * @description The observable for the specific price table columns
   * @type {Observable<ColumnConfig[]>}
   */
  protected readonly specificPriceTableColumns$ = this._specificPriceTableColumns$.asObservable();

  /**
   * @description The elements of the specific price table
   * @type {SpecificPrice[]}
   */
  protected specificPriceElements: SpecificPrice[] = [];

  /**
   * @description The icon for the empty table logo
   * @type {string}
   */
  protected readonly emptyTableLogo = EMPTY_TABLE_LOGO;

  /**
   * @description The category cell template
   * @type {TemplateRef<any>}
   */
  @ViewChild('categoryTemplate', { static: true }) categoryTemplate: TemplateRef<any>;
  
  /**
   * @description The price cell template
   * @type {TemplateRef<any>}
   */
  @ViewChild('priceTemplate', { static: true }) priceTemplate: TemplateRef<any>;

  /**
   * @description The unit cell template
   * @type {TemplateRef<any>}
   */
  @ViewChild('unitTemplate', { static: true }) unitTemplate: TemplateRef<any>;

  /**
   * @description The function to create a new specific item in the table.
   * @returns {SpecificPrice}
   */
  protected readonly newSpecificItemFactory = () => {
    this.specificPriceFormControl.push(new FormGroup({
      category: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      unit: new FormControl(null, [Validators.required]),
    }));

    return <SpecificPrice>{
    id: this.specificPriceElements.length,
    category: null,
    price: null,
    unit: null
  }};

  /**
   * @description The function to delete a specific item in the table.
   * @returns {(element: SpecificPrice) => boolean}
   */
  protected readonly deleteSpecificItemFactory = async (element: SpecificPrice) => {
    this.specificPriceFormControl.removeAt(element.id);
    return true
  }

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
   * @description An obervable of the options for the destination country airports
   * @type {Observable<SelectFieldOption[]>}
   */
  protected readonly destinationAirports$ = this.destinationCountry$.pipe(
    map(country => COUNTRY_INFO_LIST.find(x => x.name === country)?.airports.map(key => ({
    value: key.code,
    label: key.code + " - "+ key.name,
  }))));

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
   * @description The error messages for the available space field
   * @type {Map<string, string>}
   */
  protected readonly availableSpaceErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "reportTrip.pricingInformation.availableSpace.errors.required"],
    [MIN_VALIDATION, "reportTrip.pricingInformation.availableSpace.errors.min"],
  ]);

  /**
   * @description The error messages for the default price field
   * @type {Map<string, string>}
   */
  protected readonly defaultPriceErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "reportTrip.pricingInformation.defaultPrice.errors.required"],
    [MIN_VALIDATION, "reportTrip.pricingInformation.defaultPrice.errors.min"],
  ]);

  /**
   * @description The item category select options
   * @type {GroupedSelectFieldOption[]}
   */
  protected readonly itemCategorySelectOptions: GroupedSelectFieldOption[] = LIST_ITEM_CATEGORY_OPTION

  /**
   * @description The error messages of the item category field
   * @type {Map<string, string>}
   */
  protected readonly itemCategoryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.itemInformation.itemCategory.errors.required"]
  ]);

  /**
   * @description The form control for the specific price
   * @type {FormArray}
   */
  protected get specificPriceFormControl() {
    return this.reportTripForm.get('specificPrice') as FormArray;
  }

  /**
   * @description The error messages for the specific price field
   * @type {Map<string, string>}
   */
  protected readonly specificPriceErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "reportTrip.pricingInformation.specificPrice.table.price.errors.required"],
    [MIN_VALIDATION, "reportTrip.pricingInformation.specificPrice.table.price.errors.min"],
  ]);

  /**
   * @description The options of units
   * @type {SelectFieldOption[]}
   */
  protected readonly unitOptions: SelectFieldOption[] = EnumUtil.enumToSelectOptions(Unit,"Unit");

  /** @inheritdoc */
  ngOnInit(): void {
    this._destinationCountry$.next(this.reportTrip?.destinationCountry);
    const specificPrice = this.reportTrip?.specificPrice.map((x,i) => {
      x.id = i
      return x
    }) || [];
    this.specificPriceElements = specificPrice || [];
    this.currentFormService.currentForm = new FormGroup({
      userCountry: new FormControl(this.reportTrip?.userCountry || this.userCountry, [Validators.required]),
      userAirport: new FormControl(this.reportTrip?.userAirport, [Validators.required]),
      departureDate: new FormControl(this.reportTrip?.departureDate, [Validators.required, dateFormatValidator, minDateValidator(this.minDepartureDate)]),
      departureTime: new FormControl(this.reportTrip?.departureTime, [Validators.required, timeFormatValidator]),
      destinationCountry: new FormControl(this.reportTrip?.destinationCountry, [Validators.required]),
      destinationAirport: new FormControl(this.reportTrip?.destinationAirport, [Validators.required]),
      arrivalDate: new FormControl(this.reportTrip?.arrivalDate, [Validators.required, dateFormatValidator]),
      arrivalTime: new FormControl(this.reportTrip?.arrivalTime, [Validators.required, timeFormatValidator]),
      availableSpace: new FormControl(this.reportTrip?.availableSpace, [Validators.required, Validators.min(0.5)]),
      defaultPrice: new FormControl(this.reportTrip?.defaultPrice, [Validators.required, Validators.min(0)]),
      specificPrice: new FormArray(specificPrice.map(x => new FormGroup({
        category: new FormControl(x.category, [Validators.required]),
        price: new FormControl(x.price, [Validators.required, Validators.min(0)]),
        unit: new FormControl(x.unit, [Validators.required]),
      })) || []),
    }, { validators: [flighTimeValidator]});
  }

  /**
   * @description Reports the trip
   * @returns {void}
   */
  protected submitForm(): void {
    this.currentFormService.submitting = true;
  }

  /** @inheritdoc */
  ngAfterViewInit(): void {
    this._specificPriceTableColumns$.next([
      {
        columnName: "reportTrip.pricingInformation.specificPrice.table.category.name",
        valueAccessor: (row: SpecificPrice) => row.category,
        template: this.categoryTemplate
      },
      {
        columnName: "reportTrip.pricingInformation.specificPrice.table.price.name",
        valueAccessor: (row: SpecificPrice) => row.price,
        template: this.priceTemplate
      },
      {
        columnName: "reportTrip.pricingInformation.specificPrice.table.unit.name",
        valueAccessor: (row: SpecificPrice) => row.unit,
        template: this.unitTemplate
      },
    ])
  }

  /**
   * @description Updates the user country
   * @param value The new value of the user country
   * @returns {void}
   */
  protected updateUserCountry(value: string): void {
    this._userCountry$.next(value as Country);
    this.reportTripForm.get(this.userCountryField).setValue(value)
    this.reportTripForm.get(this.userAirportField).setValue(null);
    this.reportTripForm.get(this.destinationCountryField).setValue(null);
    this.reportTripForm.get(this.destinationAirportField).setValue(null);
  }

  /**
   * @description Updates the destination country
   * @param value The new value of the destination country
   * @returns {void}
   */
  protected destinationUserCountry(value: string): void {
    this._destinationCountry$.next(value as Country);
    this.reportTripForm.get(this.destinationCountryField).setValue(value)
    this.reportTripForm.get(this.destinationAirportField).setValue(null);
  }
}
