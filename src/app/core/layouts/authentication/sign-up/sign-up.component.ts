import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { APPLICATION_NAME } from '../../../../misc/constants/application';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../../misc/constants/validations';
import { ConnectStatus, Credentials } from '../../../../api/users.service.api';
import { CurrentFormService } from '../../../../services/current-form.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../misc/validation/confirm-password.validation';
import { LIST_OF_PASSWORD_VALIDATION_ERRORS, passwordValidator } from '../../../../misc/validation/password.validator';

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
   * @description The error messages of the email field
   * @type {Map<string, string>}
   */
  protected readonly emailErrorCaptions = new Map<string, string>([
    [EMAIL_VALIDATION, "global.credentials.errors.email.email"],
    [REQUIRED_VALIDATION, "global.credentials.errors.email.required"]
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
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: passwordMatchValidator});
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
