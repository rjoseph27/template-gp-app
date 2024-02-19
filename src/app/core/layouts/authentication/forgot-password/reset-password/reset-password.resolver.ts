import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { BaseAuthenticationResolver } from "../../base-auth-resolver";
import { ResetPasswordGetRequestResponse } from "../../../../../api/users/users.type";

/**
 * @class ResetPasswordResolver
 * @description The reset password resolver
 */
@Injectable()
export class ResetPasswordResolver extends BaseAuthenticationResolver implements Resolve<string> {
  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
        this.loadingService.startLoading();
        const result = await this.usersService.getResetPassword(route.params['id'])
        .then((res) => {
            if(res.requestResponse === ResetPasswordGetRequestResponse.VALID_LINK)
            {
                return res.userId;
            } else {
                this.catchError('global.resetPassword.errors.expired');
            }
            return null;
        })
        .catch(() => {
            this.catchError();
        });
        this.loadingService.endLoading();

        return result || '';
    }
}