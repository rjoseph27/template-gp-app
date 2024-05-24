import { Country } from "../../enums/country.enum";
import { Currency } from "../../enums/currency.enum";
import { CountryInfo } from "./countries.type";
import { CANADA_AIRPORTS, CANADA_SUCCURSALES, CanadaRegions } from "./regions/canada";
import { FRANCE_AIRPORTS, FRANCE_SUCCURSALES, FranceRegions } from "./regions/france";
import { SENEGAL_AIRPORTS, SENEGAL_SUCCURSALES, SenegalRegions } from "./regions/senegal";

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
        },
        regions: Object.keys(CanadaRegions).map((key) => CanadaRegions[key as keyof typeof CanadaRegions]),
        airports: CANADA_AIRPORTS,
        currency: {currency: Currency.CAD, step: 20 },
        succursales: CANADA_SUCCURSALES
    },
    {
        name: Country.SN,
        flag: '🇸🇳',
        phone: {
            code: '+221',
            length: 9,
            phoneFormat: '__ ___ __ __'
        },
        regions: Object.keys(SenegalRegions).map((key) => SenegalRegions[key as keyof typeof SenegalRegions]),
        airports: SENEGAL_AIRPORTS,
        currency: {currency: Currency.XOF, step: 1000 },
        succursales: SENEGAL_SUCCURSALES
    },
    {
        name: Country.FR,
        flag: '🇫🇷',
        phone: {
            code: '+33',
            length: 10,
            phoneFormat: '_ __ __ __ __'
        },
        regions: Object.keys(FranceRegions).map((key) => FranceRegions[key as keyof typeof FranceRegions]),
        airports: FRANCE_AIRPORTS,
        currency: {currency: Currency.EUR, step: 20 },
        succursales: FRANCE_SUCCURSALES
    }
]

