import { BusinessKey } from "../../enums/business-id";
import { Country } from "../../enums/country.enum";
import { Currency } from "../../enums/currency.enum";
import { CountryInfo } from "./countries.type";
import { CANADA_AIRPORTS, CANADA_SUCCURSALES, CanadaRegions } from "./regions/canada";
import { COTE_IVOIRE_AIRPORTS, COTE_IVOIRE_SUCCURSALES, CoteIvoireRegions } from "./regions/cote-ivoire";
import { FRANCE_AIRPORTS, FRANCE_SUCCURSALES, FranceRegions } from "./regions/france";
import { SENEGAL_AIRPORTS, SENEGAL_SUCCURSALES, SenegalRegions } from "./regions/senegal";

/**
 * @constant 
 * @description The list of country info
 */
export const COUNTRY_INFO_LIST: CountryInfo[] = [
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
        succursales: SENEGAL_SUCCURSALES,
        businessKey: BusinessKey.NINEA
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
        succursales: FRANCE_SUCCURSALES,
        businessKey: BusinessKey.SIREN
    },
    {
        name: Country.CI,
        flag: '🇨🇮',
        phone: {
            code: '+225',
            length: 11,
            phoneFormat: '__ __ _ _____'
        },
        regions: Object.keys(CoteIvoireRegions).map((key) => CoteIvoireRegions[key as keyof typeof CoteIvoireRegions]),
        airports: COTE_IVOIRE_AIRPORTS,
        currency: {currency: Currency.XOF, step: 1000 },
        succursales: COTE_IVOIRE_SUCCURSALES,
        businessKey: BusinessKey.NIF
    },
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
        succursales: CANADA_SUCCURSALES,
        businessKey: BusinessKey.CORPORATION_NUMBER
    },
    {
        name: Country.US,
        flag: '🇺🇸',
        phone: {
            code: '+1',
            length: 10,
            phoneFormat: '(___) ___-____'
        },
        regions: Object.keys(CanadaRegions).map((key) => CanadaRegions[key as keyof typeof CanadaRegions]),
        airports: CANADA_AIRPORTS,
        currency: {currency: Currency.CAD, step: 20 },
        succursales: CANADA_SUCCURSALES,
        businessKey: BusinessKey.EIN
    }
]

