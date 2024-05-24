import { SelectFieldOption } from "../../core/elements/input/select-field/select-field.component";

/**
 * @class EnumUtil
 * @description A utility class for enums
 */
export class EnumUtil {
    /**
     * @description Converts an enum to select options
     * @param enumObj The enum to convert
     * @param translationCategory The translation category
     * @param prefix The value accessor of the select options
     * @returns The select options
     */
    static enumToSelectOptions(enumObj: any, translationCategory: string): SelectFieldOption[] {
        return Object.keys(enumObj).map(key => ({
            value: key,
            label: EnumUtil.EnumTranslationKey(enumObj,key, translationCategory),
        }));
    }

    /**
     * @description Generate the translation key for a enum
     * @param enumObj The enum
     * @param key The value of the enum
     * @param translationCategory The translation category
     * @returns A translation key
     */
    static EnumTranslationKey(enumObj: any, key: string, translationCategory: string): string {
        return `enums.${translationCategory}.${enumObj[key]}`;
    }

    /**
     * @description A method that get the key of the enum with the help of the value.
     * @param enumObj The enum
     * @param value The value of the enum
     * @returns The key of the enum
     */
    static getKeyByValue(enumObj: any, value: any): string | undefined {
        return Object.keys(enumObj).find(key => enumObj[key] === value);
      }
}