import { Component, OnInit, inject } from '@angular/core';
import { CurrentFormService } from '../../../../services/current-form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from '../../../../misc/constants/validations';
import { Router } from '@angular/router';

/**
 * @class GhForgotPasswordComponent
 * @description The forgot password component for the application
 */
@Component({
  selector: 'gh-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [CurrentFormService]
})
export class GhForgotPasswordComponent implements OnInit{
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
   * @description The name of the email field
   * @type {string}
   */
  protected readonly emailField: string = 'email';

  /**
   * @description The forgot password form
   * @type {FormGroup}
   */
  protected get forgotPasswordForm(): FormGroup {
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

  /**
   * @description The email field control
   * @type {FormControl}
   */
  protected sendReinitializationLink(): void {
    this.currentFormService.submitting = true;
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.currentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
