import { Component, Input, OnInit, inject } from '@angular/core';
import { APPLICATION_NAME } from '../../../../misc/constants/application';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../../misc/constants/validations';
import { CurrentFormService } from '../../../../services/current-form.service';
import { Router } from '@angular/router';
import { ClientRoutes } from '../../../../client/client.route';

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
   * @description The url of the image
   * @type {string}
   */
  @Input() imageUrl: string;

  /**
   * @description The url of the sign up page
   * @type {string}
   */
  @Input() signUpUrl: string;

  /**
   * @description The url of the forgot password page
   * @type {string}
   */
  @Input() forgotPasswordUrl: string;

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
  private readonly router: Router = inject(Router);
  
  /**
   * @description The log in form
   * @type {FormGroup}
   */
  protected get loginForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

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
  protected readonly passwordErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.credentials.errors.password.required"],
  ]);

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.currentFormService.currentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.currentFormService.submitting$.pipe(
      filter(loading => !loading),
      tap(() => this.loginForm.get(this.passwordField).reset()
    )).subscribe();
  } 
  
  /**
   * @description The login event emitter
   * @type {void}
   */
  protected login(): void {
    this.currentFormService.submitting = true;
  }

  /**
   * @description Redirects the user to the forgot password page
   * @returns {void}
   */
  protected redirectToForgotPassword(): void {
    this.router.navigate([this.forgotPasswordUrl]);
  }

  /**
   * @description Redirects the user to the sign up page
   * @returns {void}
   */
  redirectToSignUpUrl(): void {
    this.router.navigate([this.signUpUrl]);
  }
}
