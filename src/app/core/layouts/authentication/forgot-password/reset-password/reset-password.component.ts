import { Component, Input, OnInit, inject } from '@angular/core';
import { CurrentFormService } from '../../../../../services/current-form.service';
import { UsersService } from '../../../../../services/users.service';
import { combineLatest, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordResponse } from '../../../../../api/users/users.type';
import { NotificationService } from '../../../../../services/notification.service';
import { NavigationService } from '../../../../../services/navigation.service';

/**
 * @class GhResetPasswordForgotPasswordComponent
 * @description The reset password component when the user forgot the password
 */
@Component({
  selector: 'gh-reset-password-forgot-password',
  templateUrl: './reset-password.component.html',
  providers: [CurrentFormService]
})
export class GhResetPasswordForgotPasswordComponent implements OnInit{
  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

  /**
   * @description The users service
   * @type {UsersService}
   */
  private readonly usersService: UsersService = inject(UsersService);

  /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * @description The notification service
   * @type {NotificationService}
   */
  private readonly notificationService: NotificationService = inject(NotificationService);

  /**
   * @description The navigation service
   * @type {NavigationService}
   */
  private readonly navigationService: NavigationService = inject(NavigationService);

  /** @inheritdoc */
  ngOnInit(): void {
    combineLatest([this.route.params, this.route.data, this.currentFormService.submitting$]).pipe(
      tap(([params, data, loading]) => {
        if(loading) {
          this.usersService.resetPassword({
            id: params['id'], 
            password: this.currentFormService.currentForm.get('password').value,
            userId: data['userId'],
          }).then(res => {
            this.currentFormService.submitting = false;
            if(res === ResetPasswordResponse.PASSWORD_SUCCESSFULLY_MODIFIED) {
              this.notificationService.successNotification('global.resetPassword.success');
              this.navigationService.redirectToMainPage();
            } else if(res === ResetPasswordResponse.ALREADY_USED_PASSWORD) {
              this.notificationService.errorNotification('global.resetPassword.errors.alreadyUsed');
              this.currentFormService.currentForm.reset();
            }
          });
        }

      })
    ).subscribe()
  }
 
}
