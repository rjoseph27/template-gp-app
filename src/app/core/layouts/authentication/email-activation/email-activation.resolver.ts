import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../../../../services/users.service";
import { inject } from "@angular/core";
import { EmailActivationRequestResponse } from "../../../../api/users/users.type";
import { LoadingService } from "../../../../services/loading.service";

/**
 * @class emailActivationResolver
 * @description The email activation resolver
 */
export class EmailActivationResolver implements Resolve<string> {
  /**
   * @description The users service
   * @type {UsersService}
   */
  private readonly usersService: UsersService = inject(UsersService);

  /**
   * @description The loading service
   * @returns {LoadingService}
   */
  private readonly loadingService: LoadingService = inject(LoadingService)

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    this.loadingService.startLoading();
    const res = await this.usersService.activateEmail(route.params['id']);
    this.loadingService.endLoading();
    if(res === EmailActivationRequestResponse.EMAIL_ACTIVATED)
    {
      return 'emailActivated'
    }
    if(res === EmailActivationRequestResponse.EMAIL_ALREADY_ACTIVATED) {
      return 'emailAlreadyActivated'
    }
  return 'error'
    
  }
}