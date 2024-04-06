import { SuccursaleInfo } from "../countries.type"

/**
 * @enum
 * @description The regions of Senegal
 */
export enum SenegalRegions {
    /**
     * @description The Dakar checkpoint
     */
    Dakar = 'Dakar',

    /**
     * @description The Saly checkpoint
     */
    Saly = 'Saly',

    /**
     * @description The Thies checkpoint
     */
    Thies = 'Thies',
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
 * @constant
 * @description The list of Senegal succursales
 */
export const SENEGAL_SUCCURSALES = new Map<any, SuccursaleInfo>([
    [SenegalRegions.Dakar, {
        name: 'SN-DK-DK-01',
        address: 'Dakar, Senegal',
        phone: '+221 33 869 53 53',
        airport: 'DSS',
        email: 'gphub221@gmx.fr'
    }],
    [SenegalRegions.Saly, {
        name: 'SN-TH-SL-01',
        address: 'Saly, Senegal',
        phone: '+221 33 957 00 00',
        airport: 'DSS',
        email: 'gphub221@gmx.fr'
    }],
    [SenegalRegions.Thies, {
        name: 'SN-TH-TH-01',
        address: 'Thies, Senegal',
        phone: '+221 33 951 00 00',
        airport: 'DSS',
        email: 'gphub221@gmx.fr'
    }]
])