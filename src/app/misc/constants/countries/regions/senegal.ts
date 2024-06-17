import { SuccursaleInfo } from "../countries.type"

/**
 * @enum
 * @description The regions of Senegal
 */
export enum SenegalRegions {
    /**
     * @description The Dakar checkpoint
     * @type {string}
     */
    Dakar = 'Dakar'
}

/**
 * @constant
 * @description The list of Senegal airports
 */
export const SENEGAL_AIRPORTS = [
    {
        name: 'Blaise Diagne International Airport',
        code: 'DSS'
    }
]

/**
 * @enum
 * @description The regions of Senegal
 */
enum SENEGAL_REGION {
    /**
     * @description The northern senegal region
     * @type {string}
     */
    DAKAR = 'Dakar',
}

/**
 * @constant
 * @description The list of Senegal succursales
 */
export const SENEGAL_SUCCURSALES = new Map<any, SuccursaleInfo>([
    [SenegalRegions.Dakar, {
        name: 'SN-DK-DK-01',
        address: 'Yoff Apecsy 1 au centre aéré de la BCEAO',
        phone: '+221 33 869 53 53',
        airport: ['DSS'],
        region: SENEGAL_REGION.DAKAR,
        email: 'gphub221@gmx.fr'
    }],
])