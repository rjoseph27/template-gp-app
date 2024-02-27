import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../../misc/constants/validations';
import { CurrentFormService } from '../../../../services/current-form.service';
import { PASSWORD_MISMATCH_VALIDATION, passwordMatchValidator } from '../../../../misc/validation/confirm-password.validation';
import { INVALID_PASSWORD_ERROR_MESSAGES, passwordValidator } from '../../../../misc/validation/password.validator';
import { INVALID_NAME_VALIDATION, nameValidator } from '../../../../misc/validation/name.validator';
import { DateUtil } from '../../../../misc/util/date.util';
import { LEGAL_AGE } from '../../../../misc/constants/application';
import { INVALID_DATE_FORMAT_VALIDATION, dateFormatValidator } from '../../../../misc/validation/date-format.validator';
import { Genders } from '../../../../misc/enums/genders.enum';
import { EnumUtil } from '../../../../misc/util/enum.util';
import { COUNTRY_INFO_LIST } from '../../../../misc/constants/countries/countries';
import { INVALID_PHONE_NUMBER_VALIDATION, phoneNumberValidator } from '../../../../misc/validation/phone.validation';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GhTermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { EMAIL_TAKEN_VALIDATOR, EmailTakenValidator } from '../../../../misc/validation/email-taken.validation';
import { PHONE_NUMBER_TAKEN_VALIDATOR, PhoneNumberTakenValidator } from '../../../../misc/validation/phone-number-taken.validator';
import { COUNTRY_SELECTION_OPTIONS, CountryInfo } from '../../../../misc/constants/countries/countries.type';
import { SelectFieldOption } from '../../../elements/input/select-field/select-field.component';
import { MAX_DATE_VALIDATION, maxDateValidator } from '../../../../misc/validation/max-date.validator';

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
   * @description The url of the log in page
   * @type {string}
   */
  @Input() logInUrl: string;

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
   * @description The name of the gender field
   * @type {string}
   */
  protected readonly genderField: string = 'gender';

  /**
   * @description The name of the country field
   * @type {string}
   */
  protected readonly countryField: string = 'country';

  /**
   * @description The name for the phone number field
   * @type {string}
   */
  protected readonly phoneNumberField: string = 'phoneNumber';

  /**
   * @description The name for the terms and conditions field
   * @type {string}
   */
  protected readonly termsAndConditionsField: string = 'termsAndConditions';

  /**
   * @description The angular router service.
   * @type {Router}
   */
  private router: Router = inject(Router);

  /**
   * @description The error messages of the email field
   * @type {Map<string, string>}
   */
  protected readonly emailErrorCaptions = new Map<string, string>([
    [EMAIL_VALIDATION, "global.credentials.errors.email.email"],
    [REQUIRED_VALIDATION, "global.credentials.errors.email.required"],
    [EMAIL_TAKEN_VALIDATOR, "global.credentials.errors.email.taken"]
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

  /**
   * @description The error messages of the date of birth field
   * @type {Map<string, string>}
   */
  protected readonly dateOfBirthErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.required"],
    [MAX_DATE_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.invalid"],
    [INVALID_DATE_FORMAT_VALIDATION, "global.signup.accountDetails.errors.dateOfBirth.invalidFormat"]
  ]);

  /**
   * @description The error messages for the gender field
   * @type {Map<string, string>}
   */
  protected readonly genderErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.gender.required"],
  ]);

  /**
   * @description The error messages for the country field
   * @type {Map<string, string>}
   */
  protected readonly countryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.country.required"],
  ]);

  /**
   * @description The error messages for the phone field
   * @type {Map<string, string>}
   */
  protected readonly phoneNumberErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.phoneNumber.required"],
    [INVALID_PHONE_NUMBER_VALIDATION, 'global.signup.accountDetails.errors.phoneNumber.invalid'],
    [PHONE_NUMBER_TAKEN_VALIDATOR, "global.signup.accountDetails.errors.phoneNumber.taken"]
  ]);

  /**
   * @description The error messages for the terms and conditons
   * @type {Map<string, string>}
   */
  protected readonly termsAndConditionsErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.termsAndConditions.required"]
  ]);

  /**
   * @description The error messages of the password field
   * @type {Map<string, string>}
   */
  protected readonly passwordErrorCaptions = INVALID_PASSWORD_ERROR_MESSAGES;

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
   * @description The options of gender
   * @type {SelectFieldOption[]}
   */
  protected readonly genderOptions: SelectFieldOption[] = EnumUtil.enumToSelectOptions(Genders,"Genders");

  /**
   * @description The options of the country
   * @type {SelectFieldOption[]}
   */
  protected readonly countryOptions: SelectFieldOption[] = COUNTRY_SELECTION_OPTIONS

  /**
   * @description The sign up form
   * @type {FormGroup}
   */
  protected get signupForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

  /**
   * @description The observable of the terms and conditions caption
   * @type {Observable<string>}
   */
  @Input() termsAndConditionsCaption: string[];

  /**
   * @description An observable of the loading state
   * @type {Observable<boolean>}
   */
  protected readonly loading$ = this.currentFormService.submitting$;

  /**
   * @description The dialog service
   * @type {MatDialog}
   */
  private readonly dialog: MatDialog = inject(MatDialog);

  /**
   * @description The email taken validator
   * @type {EmailTakenValidator}
   */
  private readonly emailTakenValidator = inject(EmailTakenValidator)

  /**
   * @description The phone number taken validator
   * @type {PhoneNumberTakenValidator}
   */
  private readonly phoneNumberTakenValidator = inject(PhoneNumberTakenValidator)
  
  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.currentForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, passwordValidator]),
      confirmPassword: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required, nameValidator]),
      lastName: new FormControl(null, [Validators.required, nameValidator]),
      dateOfBirth: new FormControl(null, [Validators.required, maxDateValidator(this.maxDate), dateFormatValidator]),
      gender: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, phoneNumberValidator]),
      termsAndConditions: new FormControl(null, [Validators.requiredTrue]),
    }, { validators: [
        passwordMatchValidator, 
        this.emailTakenValidator.validate.bind(this.emailTakenValidator),
        this.phoneNumberTakenValidator.validate.bind(this.phoneNumberTakenValidator)
      ] });
  }

  /**
   * @description Gets the current country info
   * @param country The country name
   * @returns The country info
   */
  protected currentCountryInfo(country: string): CountryInfo {
    return COUNTRY_INFO_LIST.find((c) => c.name === country);
  }

  /**
   * @description Redirects the user to the log in page
   * @returns {void}
   */
  protected redirectToLogInUrl(): void {
    this.router.navigate([this.logInUrl]);
  }

  /**
   * @description Opens the terms and conditions modal
   * @returns {void}
   */
  protected openTermsAndConditionsModal(): void {
    const dialogRef = this.dialog.open(GhTermsAndConditionsComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '95vh',
    });
  }

  /**
   * @description The sign up event emitter
   * @type {EventEmitter<void>}
   */
  protected signUp(): void {
    this.currentFormService.submitting = true;
  }
}
