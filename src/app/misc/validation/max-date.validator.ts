import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid max date.
 */
export const MAX_DATE_VALIDATION = 'maxDate';

/**
 * @constant
 * @description A validator function that checks if the date does not exceed the maximum date.
 */
export const maxDateValidator = (maxDate: Date): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const selectedDate = control.value?.date;

            if(!selectedDate) {
                return null
            }
    
            if (!isNaN(selectedDate.getTime()) && selectedDate > maxDate) {
                return { maxDate: maxDate };
            }
    
            return null;
        };
    }
