import { SuccursaleInfo } from "../countries.type"


/**
 * @enum
 * @description The regions of France
 */
export enum FranceRegions {
    /**
     * @description The Paris checkpoint
     * @type {string}
     */
    Paris = 'Paris'
}

/**
 * @constant
 * @description The list of France airports
 */
export const FRANCE_AIRPORTS = [
    {
        name: 'Paris Charles de Gaulle Airport',
        code: 'CDG'
    },
    {
        name: 'Paris Orly Airport',
        code: 'ORY'
    },
    {
        name: 'Nice Côte d\'Azur Airport',
        code: 'NCE'
    },
    {
        name: 'Lyon-Saint Exupéry Airport',
        code: 'LYS'
    },
    {
        name: 'Marseille Provence Airport',
        code: 'MRS'
    },
    {
        name: 'Toulouse-Blagnac Airport',
        code: 'TLS'
    },
    {
        name: 'Bordeaux-Mérignac Airport',
        code: 'BOD'
    },
    {
        name: 'Nantes Atlantique Airport',
        code: 'NTE'
    },
    {
        name: 'Lille Airport',
        code: 'LIL'
    },
    {
        name: 'Strasbourg International Airport',
        code: 'SXB'
    }
]

/**
 * @enum
 * @description The regions of France
 */
enum FRANCE_REGION {
    IDF = 'IDF',
}

/**
 * @constant
 * @description The list of France succursales
 */
export const FRANCE_SUCCURSALES = new Map<FranceRegions, SuccursaleInfo>(
    [
        [FranceRegions.Paris, {
            name: 'FR-IDF-PR-01',
            address: '67 Boulevard Du Genereal Leclerc 92110 CLICHY',
            phone: '+33 6 18 11 50 55',
            airport: ['CDG', 'ORY'],
            region: FRANCE_REGION.IDF,
            email: 'gphub221@gmx.fr'
        }],
    ]
)
