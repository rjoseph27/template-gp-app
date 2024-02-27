import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid min date.
 */
export const MIN_DATE_VALIDATION = 'minDate';

/**
 * @constant
 * @description A validator function that checks if the date does not go below the minimum date.
 */
export const minDateValidator = (minDate: Date): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            const selectedDate = control.value?.date;

            if(!selectedDate) {
                return null
            }
    
            if (!isNaN(selectedDate.getTime()) && selectedDate < minDate) {
                return { minDate: minDate };
            }
    
            return null;
        };
    }