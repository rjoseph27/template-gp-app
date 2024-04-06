import { SuccursaleInfo } from "../countries.type"

/**
 * @enum
 * @description The regions of Canada
 */
export enum CanadaRegions {
    /**
     * @description The Montreal checkpoint
     */
    Montreal = 'Montreal',

    /**
     * @description The Quebec city checkpoint
     */
    Quebec = 'Quebec',

    /**
     * @description The Sherbrooke checkpoint
     */
    Sherbrooke = 'Sherbrooke'
}

/**
 * @constant
 * @description The list of Canada airports
 */
export const CANADA_AIRPORTS = [
    {
        name: 'Calgary International Airport',
        code: 'YYC'
    },
    {
        name: 'Edmonton International Airport',
        code: 'YEG'
    },
    {
        name: 'Fredericton International Airport',
        code: 'YFC'
    },
    {
        name: 'Gander International Airport',
        code: 'YQX'
    },
    {
        name: 'Halifax Stanfield International Airport',
        code: 'YHZ'
    },
    {
        name: 'Greater Moncton Roméo LeBlanc International Airport',
        code: 'YQM'
    },
    {
        name: 'Montréal–Trudeau International Airport',
        code: 'YUL'
    },
    {
        name: 'Ottawa Macdonald–Cartier International Airport',
        code: 'YOW'
    },
    {
        name: 'Québec/Jean Lesage International Airport',
        code: 'YQB'
    },
    {
        name: 'St. John\'s International Airport',
        code: 'YYT'
    },
    {
        name: 'Toronto Pearson International Airport',
        code: 'YYZ'
    },
    {
        name: 'Vancouver International Airport',
        code: 'YVR'
    },
    {
        name: 'Winnipeg International Airport',
        code: 'YWG'
    },
]

/**
 * @constant
 * @description The list of Canada succursales
 */
export const CANADA_SUCCURSALES = new Map<CanadaRegions, SuccursaleInfo>(
    [
        [CanadaRegions.Montreal, {
            name: 'CA-QC-MTL-01',
            address: '1234 Rue de la rue, Montreal, QC, H1H 1H1',
            phone: '+1 123 456 7890',
            airport: 'YUL',
            email: 'gphub221@gmx.fr'
        }],
        [CanadaRegions.Quebec, {
            name: 'CA-QC-QC-01',
            address: '1234 Rue de la rue, Quebec, QC, H1H 1H1',
            phone: '+1 123 456 7890',
            airport: 'YQB',
            email: 'gphub221@gmx.fr'
        }],
        [CanadaRegions.Sherbrooke, {
            name: 'CA-QC-SHE-01',
            address: '1234 Rue de la rue, Sherbrooke, QC, H1H 1H1',
            phone: '+1 123 456 7890',
            airport: 'YQB',
            email: 'gphub221@gmx.fr'
        }]
    ]
)
