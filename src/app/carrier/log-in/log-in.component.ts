import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CurrentFormService } from '../../services/current-form.service';
import { tap } from 'rxjs/operators';
import { CarrierRoutes } from '../carrier.route';
import { AccountType } from '../../api/users/users.type';

/**
 * @constant
 * @description The title of the log in page
 */
const ACCOUNT_PAGE_TITLE = 'global.login.carrierTitle';

/**
 * @title Log In Component
 * @component CarrierLogInComponent
 * @description The log in page for the users of the application.
 */
@Component({
  selector: 'carrier-log-in',
  templateUrl: './log-in.component.html',
  providers: [CurrentFormService],
})
export class CarrierLogInComponent implements OnInit {
  /**
   * @description The title of the page
   * @type {string}
   */
  protected readonly pageTitle = ACCOUNT_PAGE_TITLE;

  /**
   * @description The url of the image
   * @type {string}
   */
  protected readonly imageUrl =
    '../../../../../assets/img/carrier-home-image.jpg';
  
  /**
   * @description The url of the forgot password page
   * @type {string}
   */
  protected readonly forgotPasswordUrl = CarrierRoutes.forgotPassword.fullPath()

  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService =
    inject(CurrentFormService);

  /**
   * @description The url of the sign up page
   * @type {string}
   */
  protected get signUpUrl(): string {
    return CarrierRoutes.signup.fullPath();
  }

  /**
   * @description The users service
   * @type {UsersService}
   */
  private readonly usersService: UsersService = inject(UsersService);

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.submitting$
      .pipe(
        tap((loading) => {
          if (loading) {
            this.usersService
              .login({
                ...this.currentFormService.currentForm.value,
                type: AccountType.CARRIER,
              })
              .then(() => {
                this.currentFormService.submitting = false;
              });
          }
        })
      )
      .subscribe();
  }
}
