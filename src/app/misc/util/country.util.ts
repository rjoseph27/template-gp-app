import { COUNTRY_INFO_LIST } from "../constants/countries/countries";
import { SUCCURSALE_BY_COUNTRY } from "../constants/countries/countries.type";

/**
 * @class CountryUtil
 * @description Util class for country
 */
export class CountryUtil {
    /**
     * @description A method that gets the country by the airport code
     * @param airportCode The airport code
     * @returns {string}
     */
    static getCityByAirportCode(airportCode: string): string {
        const regions = SUCCURSALE_BY_COUNTRY.map(x => x.regions).flat(); 
        return regions.find(z => z[1].airport === airportCode)[0]
    }

    /**
     * @description A method that gets the succursale by the airport code
     * @param airportCode The airport code
     * @returns {any}
     */
    static getSuccursaleByAirportCode(airportCode: string): any {
        const regions = SUCCURSALE_BY_COUNTRY.map(x => x.regions).flat(); 
        return regions.find(z => z[1].airport === airportCode)[1].name
    }

    /**
     * @description A method that gets the succursale by the city
     * @param city The city
     * @returns {string}
     */
    static getSuccursaleByCity(city: string): any {
        return COUNTRY_INFO_LIST.map(x => x.succursales).find(x => x.get(city)).get(city).name 
    }

    /**
     * @description A method that gets the country of a succursale
     * @param succursale A succursale
     * @returns {string}
     */
    static getCountryBySuccursale(succursale: string): string {
        return SUCCURSALE_BY_COUNTRY.find(x => x.regions.some(z => z[1].name === succursale)).country
    }

    /**
     * @description A method that gets the city of a succursale
     * @param succursale A succursale
     * @returns {string}
     */
    static getCityBySuccursale(succursale: string): string {
        return SUCCURSALE_BY_COUNTRY.find(x => x.regions.some(z => z[1].name === succursale)).regions.find(z => z[1].name === succursale)[0]
    }
}