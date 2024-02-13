import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { inject } from '@angular/core';

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
 * @description A method that checks if the email is taken
 * @param control The control to validate
 * @returns {Promise<ValidationErrors | null>}
 */
validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const email = control.get('email');
    // Make a request to your server to check if the email is taken
     this.userService.isEmailTaken(email.value).then(response => {
            email.setErrors(!response ? null : { emailTaken: true });
        }),
        catchError((error) => {
            // Handle server error
            email.setErrors({ serverError: true });
            return of(error);
        })

        return null;
    }
}
