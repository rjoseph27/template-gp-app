import { Component, Input, OnInit, inject } from '@angular/core';
import { APPLICATION_NAME } from '../../../../misc/constants/application';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../../misc/constants/validations';
import { CurrentFormService } from '../../../../services/current-form.service';
import { Router } from '@angular/router';

/**
 * @title Log in Component
 * @component GhLoginComponent 
 * @description The base log in component for the application
 */
@Component({
  selector: 'gh-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class GhLoginComponent implements OnInit{
  /**
   * @description The title of the login component
   * @type {string}
   */
  @Input() title: string;

  /**
   * @description The url of the sign up page
   * @type {string}
   */
  @Input() signUpUrl: string;

  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

  /**
   * @description An observable of the loading state
   * @type {Observable<boolean>}
   */
  protected readonly loading$ = this.currentFormService.submitting$;

  /**
   * @description a boolean value to determine if the user can register
   * @type {boolean}
   */
  @Input() canRegister: boolean = false;

  /**
   * @description The application name
   * @type {string}
   */
  protected readonly applicationName = APPLICATION_NAME;

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
   * @description The angular router service.
   * @type {Router}
   */
  private router: Router = inject(Router);

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
  
  /**
   * @description The log in form
   * @type {FormGroup}
   */
  protected get loginForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.currentFormService.currentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginForm.valueChanges.pipe(
      tap(() => {
        if(this.loginForm.get(this.emailField).errors?.[EMAIL_VALIDATION])
        {
          this._emailErrorMessage$.next("global.credentials.errors.email.email");
        }

        if(this.loginForm.get(this.emailField).errors?.[REQUIRED_VALIDATION])
        {
          this._emailErrorMessage$.next("global.credentials.errors.email.required");
        }

        if(this.loginForm.get(this.passwordField).errors?.[REQUIRED_VALIDATION])
        {
          this._passwordErrorMessage$.next("global.credentials.errors.password.required");
        }

        if(!this.loginForm.get(this.emailField).errors) {
          this._emailErrorMessage$.next(undefined);
        }

        if(!this.loginForm.get(this.passwordField).errors) {
          this._passwordErrorMessage$.next(undefined);
        }
      })
    ).subscribe();
  } 
  
  /**
   * @description The login event emitter
   * @type {EventEmitter<void>}
   */
  protected login(): void {
    this.loginForm.get(this.passwordField).reset();
    this._passwordErrorMessage$.next(undefined);
    this.currentFormService.submitting = true;
  }

  /**
   * @description Redirects the user to the sign up page
   * @returns {void}
   */
  redirectToSignUpUrl(): void {
    this.router.navigate([this.signUpUrl]);
  }
}
