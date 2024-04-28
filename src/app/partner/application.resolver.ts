import { Injectable, inject } from "@angular/core";
import { LoadingService } from "../services/loading.service";
import { UsersService } from "../services/users.service";
import { PartnerUserInfo } from "../api/users/users.type";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { GlobalTranslateService } from "../services/global-translate.service";

/**
 * @class PartnerApplicationResolver
 * @description The resolver for the partner application.
 */
@Injectable()
export class PartnerApplicationResolver implements Resolve<PartnerUserInfo> {
  /**
  * @description The users service
  * @type {UsersService}
  */
  private readonly userService: UsersService = inject(UsersService);

  /**
   * @description The loading service
   * @returns {LoadingService}
   */
  private readonly loadingService: LoadingService = inject(LoadingService)

  /**
   * @description The global translate service
   * @type {GlobalTranslateService}
   */
  private readonly globalTranslateService: GlobalTranslateService = inject(GlobalTranslateService);

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<PartnerUserInfo> {
      if(this.userService.currentUserId) {
            this.loadingService.startLoading();
            const userInfo = await this.userService.getPartnerUserInfo(this.userService.currentUserId);
            this.loadingService.endLoading();
            if(userInfo) {
                this.globalTranslateService.resolveLanguage(userInfo.language);
                return userInfo;
            }
        }

        return undefined;
    }
}