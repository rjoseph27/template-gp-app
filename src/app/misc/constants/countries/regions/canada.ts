import { SuccursaleInfo } from "../countries.type"

/**
 * @enum
 * @description The regions of Canada
 */
export enum CanadaRegions {
    /**
     * @description The Montreal checkpoint
     * @type {string}
     */
    Montreal = 'Montreal'
}

/**
 * @constant
 * @description The list of Canada airports
 */
export const CANADA_AIRPORTS = [
    {
        name: 'Pierre Elliott Trudeau International Airport',
        code: 'YUL'
    }
]

/**
 * @enum
 * @description The regions of Canada
 */
enum CANADA_REGION {
    /**
     * @description The Montreal region
     * @type {string}
     */
    MONTREAL = 'Montreal',
}

/**
 * @constant
 * @description The list of Canada succursales
 */
export const CANADA_SUCCURSALES = new Map<any, SuccursaleInfo>([
    [CanadaRegions.Montreal, {
        name: 'SN-QC-MTL-01',
        address: ' - ',
        phone: '+221 78 926 05 53',
        airport: ['YUL'],
        region: CANADA_REGION.MONTREAL,
        email: 'gphub221@gmx.fr'
    }],
])