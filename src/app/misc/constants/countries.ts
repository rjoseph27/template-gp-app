import { Country } from "../enums/country.enum";

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

    phone: PhoneInfo,
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
 * @description The list of country info
 */
export const COUNTRY_INFO_LIST: CountryInfo[] = [
    {
        name: Country.CA,
        flag: '🇨🇦',
        phone: {
            code: '+1',
            length: 10,
            phoneFormat: '(___) ___-____'
        }  
    },
    {
        name: Country.SN,
        flag: '🇸🇳',
        phone: {
            code: '+221',
            length: 9,
            phoneFormat: '__ ___ __ __'
        }  
    }
]