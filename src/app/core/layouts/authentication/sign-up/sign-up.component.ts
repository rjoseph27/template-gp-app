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
import { passwordValidator } from '../../../../misc/validation/password.validator';

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

  protected readonly confirmPasswordField: string = 'confirmPassword';

  /**
   * @description The backing field for the email error message.
   * @type {BehaviorSubject<string>}
   */
  private readonly _emailErrorMessage$ = new BehaviorSubject<string>(undefined);

  /**
   * @description The backing field for the password error message.
   * @type {BehaviorSubject<string>}
   */
  private readonly _passwordErrorMessage$ = new BehaviorSubject<string>(undefined);
  
  private readonly _confirmPasswordErrorMessage$ = new BehaviorSubject<string>(undefined);

  /**
   * @description An observable of the email error message
   * @type {Observable<string>}
   */
  protected readonly emailErrorMessage$ = this._emailErrorMessage$.asObservable();

  /**
   * @description An observable of the password error message
   * @type {Observable<string>}
   */
  protected readonly passwordErrorMessage$ = this._passwordErrorMessage$.asObservable();

  protected readonly confirmPasswordErrorMessage$ = this._confirmPasswordErrorMessage$.asObservable();

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
}
