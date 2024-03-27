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
}