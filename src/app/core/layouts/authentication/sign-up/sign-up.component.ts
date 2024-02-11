import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../../misc/constants/validations';
import { CurrentFormService } from '../../../../services/current-form.service';
import { PASSWORD_MISMATCH_VALIDATION, passwordMatchValidator } from '../../../../misc/validation/confirm-password.validation';
import { LIST_OF_PASSWORD_VALIDATION_ERRORS, passwordValidator } from '../../../../misc/validation/password.validator';
import { INVALID_NAME_VALIDATION, nameValidator } from '../../../../misc/validation/name.validator';
import { DateUtil } from '../../../../misc/util/date.util';
import { LEGAL_AGE } from '../../../../misc/constants/application';
import { MINIMUM_AGE_VALIDATION, minimumAgeValidator } from '../../../../misc/validation/minimum-age.validator';
import { INVALID_DATE_FORMAT_VALIDATION, dateFormatValidator } from '../../../../misc/validation/date-format.validator';

/**
 * @title Sign Up Component
 * @component GhSignUpComponent 
 * @description The base sign up component for the application
 */
@Component({
  selector: 'gh-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class GhSignUpComponent implements OnInit{
  /**
   * @description The title of the login component
   * @type {string}
   */
  @Input() title: string;

  /**
   * @description The name of the email field
   * @type {string}
   */
  protected readonly emailField: string = 'email';

  /**
   * @description The name of the password field
   * @type {string}
   */
  protected readonly passwordField: string = 'password';

  /**
   * @description The name of the confirm password field
   * @type {string}
   */
  protected readonly confirmPasswordField: string = 'confirmPassword';

  /**
   * @description The name of the first name field
   * @type {string}
   */
  protected readonly firstNameField: string = 'firstName';

  /**
   * @description The name of the last name field
   * @type {string}
   */
  protected readonly lastNameField: string = 'lastName';

  /**
   * @description The name of the date of birth field
   * @type {string}
   */
  protected readonly dateOfBirthField: string = 'dateOfBirth';

  /**
   * @description The error messages of the email field
   * @type {Map<string, string>}
   */
  protected readonly emailErrorCaptions = new Map<string, string>([
    [EMAIL_VALIDATION, "global.credentials.errors.email.email"],
    [REQUIRED_VALIDATION, "global.credentials.errors.email.required"]
  ]);

  /**
   * @description The error messages of the confirm password field
   * @type {Map<string, string>}
   */
  protected readonly confirmPasswordErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.credentials.errors.confirmPassword.required"],
    [PASSWORD_MISMATCH_VALIDATION, "global.credentials.errors.confirmPassword.mismatch"]
  ]);

  /**
   * @description The error messages of the first name field
   * @type {Map<string, string>}
   */
  protected readonly firstNameErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.firstName.required"],
    [INVALID_NAME_VALIDATION, "global.signup.accountDetails.errors.firstName.invalid"]
  ]);

  /**
   * @description The error messages of the last name field
   * @type {Map<string, string>}
   */
  protected readonly lastNameErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.lastName.required"],
    [INVALID_NAME_VALIDATION, "global.signup.accountDetails.errors.lastName.invalid"]
  ]);

  protected readonly dateOfBirthErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.required"],
    [MINIMUM_AGE_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.invalid"],
    [INVALID_DATE_FORMAT_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.invalidFormat"]
  ]);

  /**
   * @description The error messages of the password field
   * @type {Map<string, string>}
   */
  protected readonly passwordErrorCaptions = new Map<string, string>(this.generatesPasswordValidations());

  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

  /**
   * @description The minimum date for the date of birth field
   * @type {Date}
   */
  protected readonly maxDate = DateUtil.subtractYearsFromDate(DateUtil.today(), LEGAL_AGE);

  /**
   * @description The sign up form
   * @type {FormGroup}
   */
  protected get signupForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.currentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, nameValidator]),
      lastName: new FormControl('', [Validators.required, nameValidator]),
      dateOfBirth: new FormControl('', [Validators.required, minimumAgeValidator, dateFormatValidator])
    }, { validators: passwordMatchValidator });
  }

  /**
   * @description Generates the password validations for the sign up form
   * @returns {Array<[string, string]>}
   */
  private generatesPasswordValidations(): Array<[string, string]> {
    const validations = LIST_OF_PASSWORD_VALIDATION_ERRORS.map((error) => [error, 'global.credentials.errors.password.invalid']);
    validations.unshift([REQUIRED_VALIDATION, 'global.credentials.errors.password.required']);
    return <Array<[string, string]>>validations;
  }
}
