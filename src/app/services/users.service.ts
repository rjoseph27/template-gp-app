import { Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';
import { ConnectStatus, CreateUser, Credentials, EmailActivationRequestResponse, ForgotPasswordRequestResponse, ResetPassword, ResetPasswordGetRequest, ResetPasswordGetRequestResponse, ResetPasswordResponse, SignUpResponse, UniqueValue } from '../api/users/users.type';
import { UsersServiceApi } from '../api/users/users.service.api';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../misc/enums/language.enum';
import { NavigationService } from './navigation.service';
import { ClientRoutes } from '../client.route';



/**
 * @class UsersService
 * @description The users service
 */
@Injectable()
export class UsersService {
  /**
   * @description The users service api
   * @type {UsersServiceApi}
   */
  private readonly usersServiceApi: UsersServiceApi = inject(UsersServiceApi); 

  /**
   * @description The notification service
   * @type {NotificationService}
   */
  private readonly notificationService: NotificationService = inject(NotificationService);

  /**
   * @description The translate service
   * @type {TranslateService}
   */
  private readonly translateService: TranslateService = inject(TranslateService);

  /**
   * @description The navigation service
   * @type {NavigationService}
   */
  private readonly navigationService: NavigationService = inject(NavigationService)

  /** 
   * @description Gets the current user id
   * @returns {string}
  */
  get currentUserId(): string {
    return localStorage.getItem('userId');
  }

  /** 
  * @description Logs the user in
  * @param credentials The credentials of the user
  * @returns {Promise<boolean>}
  */
  login(credentials: Credentials): Promise<boolean> {
    return this.usersServiceApi.connect({email: credentials.email, password: credentials.password}).then(msg => {
      if(msg.message === ConnectStatus.LOGIN_SUCCESSFUL) {
        localStorage.setItem('token', msg.token);
        localStorage.setItem('userId', msg.userId);
        this.navigationService.redirectToApplication();
      }
      return true;
    }).catch((e) => {
      if(e.error.message === ConnectStatus.WRONG_CREDENTIALS) {
        this.notificationService.errorNotification('global.login.errors.login.wrongCredentials');
      } else {
        this.notificationService.errorNotification('global.login.errors.login.internalServerError');
      }
      return false;
    });
   }

   /**
    * @description Creates a new user
    * @param newUser The new user to create
    * @returns {Promise<boolean>}
    */
   create(newUser: CreateUser): Promise<boolean> {
    newUser.language = Language[this.translateService.currentLang.toUpperCase() as keyof typeof Language];
    return this.usersServiceApi.createUser(newUser).then(msg => {
      if(msg.message === SignUpResponse.USER_CREATED) {
        this.navigationService.redirectToMainPage();
        return true;
      }
      this.notificationService.errorNotification('global.errors.serverError');
      return false;
    });
   }

   /**
    * @description Checks if the email is taken
    * @param email The email to check
    * @returns {Promise<boolean>}
    */
   isEmailTaken(email: string): Promise<boolean> {
    return this.usersServiceApi.isEmailTaken(email).then(msg => {
      if(msg.message === UniqueValue.TAKEN) {
        return true;
      }
      return false;
    });
   }

   /**
    * @description Checks if the phone number is taken
    * @param phoneNumber The phone number to check
    * @returns {Promise<boolean>}
    */
   isPhoneNumberTaken(phoneNumber: string): Promise<boolean> {
    return this.usersServiceApi.isPhoneNumberTaken(phoneNumber).then(msg => {
      if(msg.message === UniqueValue.TAKEN) {
        return true;
      }
      return false;
    });
   }

   /**
    * @description Activates the email
    * @param id The id of the email activation request
    * @returns {Promise<boolean>}
    */
   activateEmail(id: string): Promise<EmailActivationRequestResponse> {
    return this.usersServiceApi.activateEmail(id).then(msg => EmailActivationRequestResponse[msg.message as keyof typeof EmailActivationRequestResponse]);
  }

  /**
   * @description Requests a password reset
   * @param email The email of the user
   * @returns {Promise<ForgotPasswordRequestResponse>}
   */
  forgotPasswordRequest(email: string): Promise<ForgotPasswordRequestResponse> {
    return this.usersServiceApi.forgotPasswordRequest(email).then(msg => ForgotPasswordRequestResponse[msg.message as keyof typeof ForgotPasswordRequestResponse]);
  }

  /**
   * @description Gets the reset password request
   * @param id The id of the reset password request
   * @returns {Promise<ResetPasswordGetRequest>}
   */
  getResetPassword(id: string): Promise<ResetPasswordGetRequest> {
    return this.usersServiceApi.getResetPassword(id).then(msg => ({
      requestResponse: ResetPasswordGetRequestResponse[msg.message as keyof typeof ResetPasswordGetRequestResponse],
      userId: msg.userId
    }));
  }

  /**
   * @description Resets the password
   * @param resetPassword The reset password request
   * @returns {Promise<ResetPasswordResponse>}
   */
  resetPassword(resetPassword: ResetPassword): Promise<ResetPasswordResponse> {
    return this.usersServiceApi.resetPassword(resetPassword).then(msg => ResetPasswordResponse[msg.message as keyof typeof ResetPasswordResponse]);
  }
}