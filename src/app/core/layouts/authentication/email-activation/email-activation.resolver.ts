import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../../../../services/users.service";
import { inject } from "@angular/core";
import { EmailActivationRequestResponse } from "../../../../api/users/users.type";

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

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    const res = await this.usersService.activateEmail(route.params['id']);
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