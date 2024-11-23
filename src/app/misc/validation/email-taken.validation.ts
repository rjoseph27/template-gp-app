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
 * @description The name of the validation that ensure that the email is taken.
 */
export const EMAIL_TAKEN_VALIDATOR = 'emailTaken';

/**
 * @class EmailTakenValidator
 * @description A validator that checks if the email is taken
 */
export class EmailTakenValidator implements AsyncValidator {
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
   * @description A method that checks if the email is taken
   * @param control The control to validate
   * @returns {Promise<ValidationErrors | null>}
   */
  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.get('email');
    const module = this.router.url.split('/')[1];
    const type = module === 'client' ? AccountType.USER : AccountType.CARRIER;
    // Make a request to your server to check if the email is taken
    this.userService
      .isEmailTaken({ email: email.value, type: type })
      .then((response) => {
        email.setErrors(!response ? null : { emailTaken: true });
      }),
      catchError((error) => {
        // Handle server error
        email.setErrors({ serverError: true });
        return of(error);
      });

    return null;
  }
}
