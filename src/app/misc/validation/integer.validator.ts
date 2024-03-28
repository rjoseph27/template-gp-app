import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid integer.
 */
export const INTEGER_VALIDATION = 'notInteger';

/**
 * @constant
 * @description A validator function that checks if the number is a integer
 */
export const integerValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
      // If the control value is empty or null, return null (no validation error)
      if (control.value === null || control.value === '') {
        return null;
      }
  
      // Check if the value is an integer using regular expression
      const integerPattern = /^-?\d+$/;
      if (!integerPattern.test(control.value)) {
        // Return validation error if the value is not an integer
        return { notInteger: true };
      }
  
      // Return null if the value is an integer
      return null;
    };