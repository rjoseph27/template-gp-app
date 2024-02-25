import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid image format.
 */
export const IMAGE_FORMAT_VALIDATION = 'imageFormat';

/**
 * @constant
 * @description A validator function that checks if the image format is valid
 */
export const imageFormatValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const fileName = control.value.name;
    const isValid = /\.(jpg|jpeg|png)$/.test(fileName?.toLowerCase()); // Convert to lower case for case-insensitive matching
    return isValid ? null : { imageFormat: true };
  };
