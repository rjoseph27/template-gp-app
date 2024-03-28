import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { CountryInfo, CurrencyInfo } from "../../../../misc/constants/countries/countries.type";
import { Observable, map } from "rxjs";
import { Country } from "../../../../misc/enums/country.enum";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { INVALID_NAME_VALIDATION, nameValidator } from "../../../../misc/validation/name.validator";
import { INVALID_PHONE_NUMBER_VALIDATION, phoneNumberValidator } from "../../../../misc/validation/phone.validation";
import { SelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { BaseRequestComponent } from "../base-request.component";
import { SendItemsRequest } from "../../../../client/service/send-items.service";
import { AlertFormType } from "../../../../api/requests/requests.type";

/**
 * @class GhSendItemsComponent
 * @description The send items component for the application
 */
@Component({
  selector: 'gh-send-items',
  templateUrl: './send-items.component.html',
  styleUrl: './send-items.component.scss',
})
export class GhSendItemsComponent extends BaseRequestComponent implements OnInit {
  /**
   * @description The name of the user region field
   * @type {string}
   */
  protected readonly userRegionField = 'userRegion';

  /**
   * @description The request
   * @type {SendItemsRequest}
   */
  @Input() request: AlertFormType;

  /**
   * @description The currency of the user
   * @type {Currency}
   */
  @Input() currency: CurrencyInfo;

  /**
   * @description The name of the destination country field.
   * @type {string}
   */
  protected readonly destinationCountryField = 'destinationCountry';

  /**
   * @description The name of the destination region field
   * @type {string}
   */
  protected readonly destinationRegionField = 'destinationRegion';

  /**
   * @description The name of the consignee full name field
   * @type {string}
   */
  protected readonly consigneeFullNameField = 'consigneeFullName';

  /**
   * @description The name of the consignee address field
   * @type {string}
   */
  protected readonly consigneeAddressField = 'consigneeAddress';

  /**
   * @description The name of the consignee phone number field
   * @type {string}
   */
  protected readonly consigneePhoneNumberField = 'consigneePhoneNumber';

  /**
   * @description The name of the item information field
   * @type {string}
   */
  protected readonly itemInformationField = 'itemInformation';

  /**
   * @description The submit caption
   * @type {string}
   */
  @Input() submitCapiton: string;

  /**
   * @description The options of the user region
   * @type {Observable<SelectFieldOption[]>}
   */
  protected readonly userRegionOptions$: Observable<SelectFieldOption[]> = this.userCountry$.pipe(
    map(country => COUNTRY_INFO_LIST.find(x => x.name === country)?.regions.map(key => ({
    value: key,
    label: key,
  }))));

  /**
   * @description The options of the destination region
   * @type {Observable<SelectFieldOption[]>}
   */
  protected readonly destinationRegionOptions$: Observable<SelectFieldOption[]> = this.destinationCountry$.pipe(
    map(country => COUNTRY_INFO_LIST.find(x => x.name === country)?.regions.map(key => ({
    value: key,
    label: key,
  }))));

  /**
   * @description The error messages for the region field
   * @type {Map<string, string>}
   */
  protected readonly regionErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "sendItems.location.region.errors.required"],
  ]);

  /**
   * @description The error messages for the region field
   * @type {Map<string, string>}
   */
  protected readonly consigneeFullNameErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "sendItems.shippingInformation.consigneeFullName.errors.required"],
    [INVALID_NAME_VALIDATION, "sendItems.shippingInformation.consigneeFullName.errors.invalid"]
  ]);

  /**
   * @description The error messages for the region field
   * @type {Map<string, string>}
   */
  protected readonly consigneeAddressErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "sendItems.shippingInformation.consigneeAddress.errors.required"],
  ]);

  /**
   * @description The error messages for the consignee phone number field
   * @type {Map<string, string>}
   */
  protected readonly consigneePhoneNumberErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "sendItems.shippingInformation.consigneePhoneNumber.errors.required"],
    [INVALID_PHONE_NUMBER_VALIDATION, "sendItems.shippingInformation.consigneePhoneNumber.errors.invalid"],
  ]);

  /**
   * @description A mode used for alert management
   * @type {boolean}
   */
  @Input() alertMode: boolean = false;
  
  /**
   * @description The send items form
   * @type {FormGroup}
   */
  protected get sendItemsForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this._userCountry$.next(this.request?.userCountry || this.userCountry);
    this._destinationCountry$.next(this.request?.destinationCountry);
    this.currentFormService.currentForm = new FormGroup({
      userCountry: new FormControl(this.request?.userCountry || this.userCountry, [Validators.required]),
      userRegion: new FormControl(this.request?.userRegion, [Validators.required]),
      destinationCountry: new FormControl(this.request?.destinationCountry || null, [Validators.required]),
      destinationRegion: new FormControl(this.request?.destinationRegion || null, [Validators.required]),
      consigneeFullName: new FormControl(this.request?.consigneeFullName || '', [Validators.required, nameValidator]),
      consigneeAddress: new FormControl(this.request?.consigneeAddress || '', [Validators.required]),
      consigneePhoneNumber: new FormControl(this.request?.consigneePhoneNumber || '', [Validators.required, phoneNumberValidator]),
      itemInformation: new FormControl(this.request?.itemInformation || undefined, [Validators.required]),
    });
  }

  /**
   * @description Updates the user country
   * @param value The new value of the user country
   * @returns {void}
   */
  protected updateUserCountry(value: string): void {
    if(value !== this.userCountry) {
      this._userCountry$.next(value as Country);
      this.sendItemsForm.get(this.userCountryField).setValue(value)
      this.sendItemsForm.get(this.userRegionField).setValue(null);
      this.sendItemsForm.get(this.destinationCountryField).setValue(null);
      this.sendItemsForm.get(this.destinationRegionField).setValue(null);
    }
  }

  /**
   * @description Gets the current country info
   * @param country The country name
   * @returns The country info
   */
  protected currentCountryInfo(country: string): CountryInfo {
    return COUNTRY_INFO_LIST.find((c) => c.name === country);
  }

  /**
   * @description Updates the destination country
   * @param value The new value of the destination country
   * @returns {void}
   */
  protected destinationUserCountry(value: string): void {
    if(this._destinationCountry$.value !== value){
      this._destinationCountry$.next(value as Country);
      this.sendItemsForm.get(this.destinationCountryField).setValue(value)
      this.sendItemsForm.get(this.destinationRegionField).setValue(null);
    }
  }

  /**
   * @description Send the form
   * @returns {void}
   */
  protected sendItems(): void {
    this.currentFormService.submitting = true;
  }
}
