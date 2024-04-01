import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid date format.
 */
export const INVALID_DATE_FORMAT_VALIDATION = 'invalidDateFormat';

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid date format.
 */
export const dateFormatValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if(control.value)
    {
      const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/; // Regular expression for "yyyy-mm-dd" format
      const isValidFormat = dateRegex.test(control.value.dateString); // Check if value matches the pattern
      return isValidFormat || !control.value.dateString ? null : { invalidDateFormat: { value: control.value.dateString } };
    }
    
    return null;
  };
