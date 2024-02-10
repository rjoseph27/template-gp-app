import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid name.
 */
export const INVALID_NAME_VALIDATION = 'invalidName';

/**
 * @constant
 * @description A validator function that checks if the name field is valid
 */
export const nameValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const validRegex = /^[a-zA-Z\-'\s]+$/; // Regular expression for valid characters
    const isValid = validRegex.test(control.value); // Check if value matches the pattern

    return isValid ? null : { invalidName: { value: control.value } };
  };
