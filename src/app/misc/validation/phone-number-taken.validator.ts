import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { inject } from '@angular/core';

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
 * @description A method that checks if the phone number is taken
 * @param control The control to validate
 * @returns {Promise<ValidationErrors | null>}
 */
validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const phoneNumber = control.get('phoneNumber');
    const currentErrors = phoneNumber.errors;

     this.userService.isPhoneNumberTaken(phoneNumber.value).then(response => {
            phoneNumber.setErrors(!response ? currentErrors : { phoneNumberTaken: true });
        }),
        catchError((error) => {
            // Handle server error
            phoneNumber.setErrors({ serverError: true });
            return of(error);
        })

        return null;
    }
}
