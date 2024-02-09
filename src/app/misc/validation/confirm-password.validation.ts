import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @constant
 * @description A validator function that checks if the password and confirm password fields match
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
};