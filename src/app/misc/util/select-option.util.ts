/**
 * @interface SelectFieldOption
 * @description An interface for the select field option
 */
export interface SelectFieldOption {
    /**
     * @description The label of the select option
     * @type {string}
     */
    label: string;

    /**
     * @description The value of the select option
     * @type {string}
     */
    value: string;
}

/**
 * @class SelectOptionUtil
 * @description A utility class for select options
 */
export class SelectOptionUtil {
    /**
     * @description Converts an enum to select options
     * @param enumObj The enum to convert
     * @returns The select options
     */
    static enumToSelectOptions(enumObj: any): SelectFieldOption[] {
        return Object.keys(enumObj).map(key => ({
            value: `enum.${typeof enumObj}.${enumObj[key]}`,
            label: key
        }));
    }
}