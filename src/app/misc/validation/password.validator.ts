import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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