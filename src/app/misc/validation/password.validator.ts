import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { REQUIRED_VALIDATION } from '../constants/validations';

/**
 * @constant
 * @description The error message keys for the password field when the password has less than 8 characters.
 */
export const EIGHTCHARACTERS_VALIDATION = 'hasNotEightCharacters';

/**
 * @constant
 * @description The error message keys for the password field when the password has no lowercase characters.
 */
export const HASNOTLOWERCASE_VALIDATION = 'hasNotLowerCase';

/**
 * @constant
 * @description The error message keys for the password field when the password has no uppercase characters.
 */
export const HASNOTUPPERCASE_VALIDATION = 'hasNotUpperCase';

/**
 * @constant
 * @description The error message keys for the password field when the password has no number characters.
 */
export const HASNOTNUMBER_VALIDATION = 'hasNotNumber';

/**
 * @constant
 * @description The error message keys for the password field when the password has no special characters.
 */
export const HASNOTSPECIALCHARACTER_VALIDATION = 'hasNotSpecialCharacter';

/**
 * @constant
 * @description The list of password validation errors
 */
const LIST_OF_PASSWORD_VALIDATION_ERRORS = [EIGHTCHARACTERS_VALIDATION, HASNOTLOWERCASE_VALIDATION, HASNOTUPPERCASE_VALIDATION, HASNOTNUMBER_VALIDATION, HASNOTSPECIALCHARACTER_VALIDATION];

 /**
   * @description Generates the password validations
   * @returns {Array<[string, string]>}
   */
function generatesPasswordValidations(): Array<[string, string]> {
    const validations = LIST_OF_PASSWORD_VALIDATION_ERRORS.map((error) => [error, 'global.credentials.errors.password.invalid']);
    validations.unshift([REQUIRED_VALIDATION, 'global.credentials.errors.password.required']);
    return <Array<[string, string]>>validations;
  }

/**
 * @constant
 * @description The error messages for the password field
 */
export const INVALID_PASSWORD_ERROR_MESSAGES =  new Map<string, string>(generatesPasswordValidations())

/**
 * @constant
 * @description A validator function that checks if the password and confirm password fields match
 */
export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
  
    // Regular expressions to check for each requirement
    const hasEightCharacters = /.{8,}/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Check if all requirements are met
    const valid = hasEightCharacters && hasLowerCase && hasUpperCase && hasNumber && hasSpecialCharacter;

    // Return null if valid, otherwise return validation error object
    return valid ? null : 
    { 
        hasNotEightCharacters: !hasEightCharacters,
        hasNotLowerCase: !hasLowerCase,
        hasNotUpperCase: !hasUpperCase,
        hasNotNumber: !hasNumber,
        hasNotSpecialCharacter: !hasSpecialCharacter
    };
  };