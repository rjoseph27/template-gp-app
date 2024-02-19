import { Component, Input, OnInit, inject } from '@angular/core';
import { CurrentFormService } from '../../../../services/current-form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../../misc/constants/validations';
import { INVALID_PASSWORD_ERROR_MESSAGES, passwordValidator } from '../../../../misc/validation/password.validator';
import { PASSWORD_MISMATCH_VALIDATION, passwordMatchValidator } from '../../../../misc/validation/confirm-password.validation';

/**
 * @class GhResetPasswordComponent
 * @description The reset password component for the application
 */
@Component({
  selector: 'gh-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class GhResetPasswordComponent implements OnInit{
  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

  /**
   * @description The title of the forgot password component
   * @type {string}
   */
  protected readonly title: string = 'Password';

  /**
   * @description The title of the page
   * @type {string}
   */
  @Input() titleText: string;

  /**
   * The content of the page
   * @type {string}
   */
  @Input() contentText: string;

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
   * @description The error messages of the confirm password field
   * @type {Map<string, string>}
   */
  protected readonly confirmPasswordErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.credentials.errors.confirmPassword.required"],
    [PASSWORD_MISMATCH_VALIDATION, "global.credentials.errors.confirmPassword.mismatch"]
  ]);

  /**
   * @description The error messages of the password field
   * @type {Map<string, string>}
   */
  protected readonly passwordErrorCaptions = INVALID_PASSWORD_ERROR_MESSAGES

  /**
   * @description The forgot password form
   * @type {FormGroup}
   */
  protected get resetPasswordForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

    /**
   * @description An observable of the loading state
   * @type {Observable<boolean>}
   */
    protected readonly loading$ = this.currentFormService.submitting$;

    /**
     * @description The error messages of the email field
     * @type {Map<string, string>}
     */
    protected readonly emailErrorCaptions = new Map<string, string>([
      [EMAIL_VALIDATION, "global.credentials.errors.email.email"],
      [REQUIRED_VALIDATION, "global.credentials.errors.email.required"]
    ]);

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.currentForm = new FormGroup({
      password: new FormControl('', [Validators.required, passwordValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: passwordMatchValidator });
  }

  protected resetPassword(): void { 
    this.currentFormService.submitting = true;
  }
}
