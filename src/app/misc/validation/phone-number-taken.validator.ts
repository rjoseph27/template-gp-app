import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountType } from '../../api/users/users.type';

/**
 * @constant
 * @description The name of the validation that ensure that the phone number is taken.
 */
export const PHONE_NUMBER_TAKEN_VALIDATOR = 'phoneNumberTaken';

/**
 * @class PhoneNumber
 * @description A validator that checks if the phone number is taken
 */
export class PhoneNumberTakenValidator implements AsyncValidator {
  /**
   * @description The users service
   * @type {UsersService}
   */
  private readonly userService: UsersService = inject(UsersService);

  /**
   * @description The router
   * @type {Router}
   */
  private readonly router: Router = inject(Router);

  /**
   * @description A method that checks if the phone number is taken
   * @param control The control to validate
   * @returns {Promise<ValidationErrors | null>}
   */
  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const phoneNumber = control.get('phoneNumber');
    const currentErrors = phoneNumber.errors;
    const module = this.router.url.split('/')[1];
    const type = module === 'client' ? AccountType.USER : AccountType.CARRIER;

    this.userService
      .isPhoneNumberTaken({ phoneNumber: phoneNumber.value, type: type })
      .then((response) => {
        phoneNumber.setErrors(
          !response ? currentErrors : { phoneNumberTaken: true }
        );
      }),
      catchError((error) => {
        // Handle server error
        phoneNumber.setErrors({ serverError: true });
        return of(error);
      });

    return null;
  }
}
