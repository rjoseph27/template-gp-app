import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { APPLICATION_NAME } from '../../../misc/constants/application';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../misc/constants/validations';

/**
 * @title Login Component
 * @component GhLoginComponent 
 * @description The base login component for the application
 */
@Component({
  selector: 'gh-login',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class GhLoginComponent implements OnInit{
  /**
   * @description The title of the login component
   * @type {string}
   */
  @Input() title: string;

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
   * @description The login form
   * @type {FormGroup}
   */
  protected readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.loginForm.valueChanges.pipe(
      tap(() => {
        if(this.loginForm.get(this.emailField).errors?.[EMAIL_VALIDATION])
        {
          this._emailErrorMessage$.next("global.login.errors.email.email");
        }

        if(this.loginForm.get(this.emailField).errors?.[REQUIRED_VALIDATION])
        {
          this._emailErrorMessage$.next("global.login.errors.email.required");
        }

        if(this.loginForm.get(this.passwordField).errors?.[REQUIRED_VALIDATION])
        {
          this._passwordErrorMessage$.next("global.login.errors.password.required");
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
  login(): void {}
}
