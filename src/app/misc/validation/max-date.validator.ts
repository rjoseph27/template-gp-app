import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { GhDate } from "../classes/gh-date";

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
            if(!control.value?.date) {
                return null
            }

            const selectedDate = new GhDate(control.value?.date)
    
            if (selectedDate.getDate().getTime() > maxDate.getTime()) {
                return { maxDate: maxDate };
            }
    
            return null;
        };
    }
