import { Country } from "../../enums/country.enum";
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
 * @constant
 * @description The country selection options
 */
export const COUNTRY_SELECTION_OPTIONS = COUNTRY_INFO_LIST.map((country: CountryInfo) => 
  ({value: country.name,
    label: EnumUtil.EnumTranslationKey(Country, EnumUtil.getKeyByValue(Country, country.name), "Country"),
    prefix: country.flag
  }))