import { Country } from "../../enums/country.enum";
import { Currency } from "../../enums/currency.enum";
import { EnumUtil } from "../../util/enum.util";
import { COUNTRY_INFO_LIST } from "./countries";

/**
 * @interface CountryInfo
 * @description An interface for the country info
 */
export interface CountryInfo {
    /**
     * @description The name of the country
     * @type {Country}
     */
    name: Country;
    /**
     * @description The flag of the country as a emoji
     * @type {string}
     */
    flag: string;

    /**
     * @description The phone info of the country
     * @type {PhoneInfo}
     */
    phone: PhoneInfo,

    /**
     * @description The regions of the country
     * @type {any[]}
     */
    regions: any[]

    /**
     * @description The airports of the country
     * @type {AirportInfo[]}
     */
    airports: AirportInfo[]

    /**
     * @description The currency of the country
     * @type {Currency}
     */
    currency: CurrencyInfo,

    /**
     * @description The list of the country's succursales
     * @type {Map<any, SuccursaleInfo>}
     */
    succursales: Map<any, SuccursaleInfo>;
}

/**
 * @interface AirportInfo
 * @description An interface for the airport info
 */
export interface AirportInfo {
    /**
     * @description The name of the airport
     * @type {string}
     */
    name: string;

    /**
     * @description The code of the airport
     * @type {string}
     */
    code: string;
}

/**
 * @interface PhoneInfo
 * @description An interface for the phone info
 */
export interface PhoneInfo {
    /**
     * @description The code of the country
     * @type {string}
     */
    code: string;

    /**
     * @description The length of the phone number
     * @type {number}
     */
    length: number;

    /**
     * @description The format of the phone number
     * @type {string}
     */
    phoneFormat: string;
}

/**
 * @interface CurrencyInfo
 * @description An interface for the currency info
 */
export interface CurrencyInfo {
  /**
   * @description The currency of the country
   * @type {Currency}
   */
  currency: Currency;

  /**
   * @description The socially accepted step used for the currency
   */
  step: number;
}

/**
 * @interface SuccursaleInfo
 * @description An interface for the succursale info
 */
export interface SuccursaleInfo {
  /**
   * @description The name of the succursale
   * @type {string}
   */
  name: string,

  /**
   * @description The name of the succursale
   * @type {string}
   */
  address: string,

  /**
   * @description The phone number of the succursale
   * @type {string}
   */
  phone: string

  /**
   * @description The airport of the succursale
   * @type {AirportInfo}
   */
  airport?: string

  /**
   * @description The email of the succursale
   * @type {string}
   */
  email: string,

  /**
   * @description The region of the succursale
   * @type {any}
   */
  region: any;
}  

/**
 * @constant
 * @description The country selection options
 */
export const COUNTRY_SELECTION_OPTIONS = COUNTRY_INFO_LIST.map((country: CountryInfo) => 
  ({value: country.name,
    label: EnumUtil.EnumTranslationKey(Country, EnumUtil.getKeyByValue(Country, country.name), "Country"),
    prefix: country.flag
  }))

/**
 * @constant
 * @description The succursale by country
 */
export const SUCCURSALE_BY_COUNTRY = COUNTRY_INFO_LIST.map(x => ({
    country: x.name,
    regions: Array.from(x.succursales)
}));