import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { EmailActivationRequestResponse } from "../../../../api/users/users.type";
import { BaseAuthenticationResolver } from "../base-auth-resolver";

/**
 * @class emailActivationResolver
 * @description The email activation resolver
 */
export class EmailActivationResolver extends BaseAuthenticationResolver implements Resolve<string> {
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