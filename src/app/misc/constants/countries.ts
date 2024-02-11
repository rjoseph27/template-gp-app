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
} 

/**
 * @constant 
 * @description The list of country info
 */
export const COUNTRY_INFO_LIST: CountryInfo[] = [
    {
        name: Country.CA,
        flag: '🇨🇦'  
    },
    {
        name: Country.SN,
        flag: '🇸🇳'  
    }
]