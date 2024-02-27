import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid time format.
 */
export const INVALID_TIME_FORMAT_VALIDATION = 'invalidTimeFormat';

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid time format.
 */
export const timeFormatValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if(control.value)
    {
      const dateRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; 
      const isValidFormat = dateRegex.test(control.value.timeString); 

      return isValidFormat ? null : { invalidTimeFormat: { value: control.value.timeString } };
    }
    
    return null;
  };