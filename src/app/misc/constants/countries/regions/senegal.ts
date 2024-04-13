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
    Dakar = 'Dakar',

    /**
     * @description The Saly checkpoint
     * @type {string}
     */
    Saly = 'Saly',

    /**
     * @description The Thies checkpoint
     * @type {string}
     */
    Thies = 'Thies',

    /**
     * @description The Diass checkpoint
     * @type {string}
     */
    Diass = 'Diass',

    /**
     * @description The Fatick checkpoint
     * @type {string}
     */
    Fatick = 'Fatick'
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

    /**
     * @description The casamance region
     * @type {string}
     */
    CASAMANCE = 'Casamance',
}

/**
 * @constant
 * @description The list of Senegal succursales
 */
export const SENEGAL_SUCCURSALES = new Map<any, SuccursaleInfo>([
    [SenegalRegions.Dakar, {
        name: 'SN-DK-DK-01',
        address: 'Dakar, Senegal',
        phone: '+221 33 869 53 53',
        airport: 'DSS',
        region: SENEGAL_REGION.DAKAR,
        email: 'gphub221@gmx.fr'
    }],
    [SenegalRegions.Saly, {
        name: 'SN-TH-SL-01',
        address: 'Saly, Senegal',
        phone: '+221 33 957 00 00',
        airport: 'DSS',
        region: SENEGAL_REGION.DAKAR,
        email: 'gphub221@gmx.fr'
    }],
    [SenegalRegions.Thies, {
        name: 'SN-TH-TH-01',
        address: 'Thies, Senegal',
        phone: '+221 33 951 00 00',
        airport: 'DSS',
        region: SENEGAL_REGION.DAKAR,
        email: 'gphub221@gmx.fr'
    }],
    [SenegalRegions.Diass, {
        name: 'SN-TH-DS-01',
        address: 'Diass, Senegal',
        phone: '+221 33 869 53 53',
        airport: 'DSS',
        region: SENEGAL_REGION.DAKAR,
        email: 'gphub221@gmx.fr'
    }],
    [SenegalRegions.Fatick, {
        name: 'SN-FK-FK-01',
        address: 'Fatck, Senegal',
        phone: '+221 77 869 53 53',
        region: SENEGAL_REGION.DAKAR,
        email: 'gphub221@gmx.fr'
    }]
])