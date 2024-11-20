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
    const regex = /[a-zA-Z_!@#$%^&*=\\\[\]{};':"|,.<>?]/g;
    const uncompleted = value?.includes('_');
    const currentErrors = control.errors;
    
    if ((value && regex.test(value)) || (value && uncompleted) || !value) {
        if(currentErrors) {
            currentErrors["invalidPhoneNumber"] = true;
            return currentErrors;
        } else {
            return { invalidPhoneNumber: true };
        }
    } else {
        if(currentErrors) {
            delete currentErrors["invalidPhoneNumber"];
            delete currentErrors["required"];
        }
    }
    return currentErrors;
};