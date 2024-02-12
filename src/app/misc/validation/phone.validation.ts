import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * @constant
 * @description the name of the invalid phone number validation
 */
export const INVALID_PHONE_NUMBER_VALIDATION = 'invalidPhoneNumber';

/**
 * @constant
 * @description A validator function that checks if the phone number field is valid
 */
export const phoneNumberValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    const regex = /[a-zA-Z_!@#$%^&*+=\-\\[\]{};':"|,.<>?]/g;
    
    if (value && regex.test(value)) {
        return { invalidPhoneNumber: true };
    }
    return null;
};
  