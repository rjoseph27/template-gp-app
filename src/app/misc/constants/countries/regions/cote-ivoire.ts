import { SuccursaleInfo } from "../countries.type"

/**
 * @enum
 * @description The regions of Cote d'Ivoire
 */
export enum CoteIvoireRegions {
    /**
     * @description The Abidjan checkpoint
     * @type {string}
     */
    Abidjan = 'Abidjan'
}

/**
 * @constant
 * @description The list of Cote d'Ivoire airports
 */
export const COTE_IVOIRE_AIRPORTS = [
    {
        name: 'Félix-Houphouët-Boigny International Airport',
        code: 'ABJ'
    }
]

/**
 * @enum
 * @description The regions of Cote d'Ivoire
 */
enum COTE_IVOIRE_REGION {
    /**
     * @description The Abidjan region
     * @type {string}
     */
    ABIDJAN = 'Abidjan',
}

/**
 * @constant
 * @description The list of Cote d'ivoire succursales
 */
export const COTE_IVOIRE_SUCCURSALES = new Map<any, SuccursaleInfo>([
    [CoteIvoireRegions.Abidjan, {
        name: 'SN-DK-DK-01',
        address: ' - ',
        phone: '+221 78 926 05 53',
        airport: ['ABJ'],
        region: COTE_IVOIRE_REGION.ABIDJAN,
        email: 'gphub221@gmx.fr'
    }],
])