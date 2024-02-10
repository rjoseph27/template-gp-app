import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LEGAL_AGE } from '../constants/application';
import { DateUtil } from '../util/date.util';

/**
 * @constant
 * @description The name of the minimum age validation
 */
export const MINIMUM_AGE_VALIDATION = 'minimumAge';

/**
 * @constant
 * @description A validator function that checks if the age field is valid
 */
export const minimumAgeValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  if (!control.value) {
    return null; // If no value is provided, return null
  }

  // Parse the input value to a Date object
  const inputValue = new Date(control.value);

  // Calculate the date 16 years ago from today
  const minimumDate = DateUtil.subtractYearsFromDate(new Date(), LEGAL_AGE);
  const isValid = inputValue <= minimumDate

  return isValid ? null : { minimumAge: { value: control.value } };
};

