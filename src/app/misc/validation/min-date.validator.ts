import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { GhDate } from "../classes/gh-date";

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
            if(!control.value?.date) {
                return null
            }

            const selectedDate = new GhDate(control.value?.date)
            
            if (selectedDate.getDate() < minDate) {
                return { minDate: minDate };
            }
    
            return null;
        };
    }