import { inject } from "@angular/core";
import { LoadingService } from "../../../services/loading.service";
import { UsersService } from "../../../services/users.service";
import { NavigationService } from "../../../services/navigation.service";
import { NotificationService } from "../../../services/notification.service";

/**
 * @class BaseAuthenticationResolver
 * @description The base authentication resolver
 */
export class BaseAuthenticationResolver {
  /**
   * @description The users service
   * @type {UsersService}
   */
  protected readonly usersService: UsersService = inject(UsersService);

  /**
   * @description The loading service
   * @returns {LoadingService}
   */
  protected readonly loadingService: LoadingService = inject(LoadingService)

  /**
   * @description The navigation service
   * @type {NavigationService}
   */
  private readonly navigationService: NavigationService = inject(NavigationService);

  /**
   * @description The notification service
   * @type {NotificationService}
   */
  private readonly notificationService: NotificationService = inject(NotificationService);

  /**
   * @description The error message
   * @param {string} message The message
   * @returns {void}
   */
  protected catchError(message = 'global.errors.serverError'): void {
    this.loadingService.endLoading();
    this.navigationService.redirectToMainPage();
    this.notificationService.errorNotification(message);
  }
}