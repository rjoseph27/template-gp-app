import { SuccursaleInfo } from "../countries.type"

/**
 * @enum
 * @description The regions of United State
 */
export enum UnitedStatesRegions {
    /**
     * @description The New York checkpoint
     * @type {string}
     */
    NewYork = 'NewYork'
}

/**
 * @constant
 * @description The list of United State airports
 */
export const UNITED_STATE_AIRPORTS = [
    {
        name: 'John F. Kennedy International Airport',
        code: 'JFK'
    },
    {
        name: 'LaGuardia Airport',
        code: 'LGA'
    },
]

/**
 * @enum
 * @description The regions of United State
 */
enum UNITED_STATE_REGION {
    /**
     * @description The New York region
     * @type {string}
     */
    NewYork = 'NewYork',
}

/**
 * @constant
 * @description The list of New York succursales
 */
export const NEW_YORK_SUCCURSALES = new Map<any, SuccursaleInfo>([
    [UnitedStatesRegions.NewYork, {
        name: 'SN-NY-NYC-01',
        address: ' - ',
        phone: '+221 78 926 05 53',
        airport: ['YUL'],
        region: UNITED_STATE_REGION.NewYork,
        email: 'gphub221@gmx.fr'
    }],
])