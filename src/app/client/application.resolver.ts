import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserInfo } from "../api/users/users.type";
import { UsersService } from "../services/users.service";
import { LoadingService } from "../services/loading.service";
import { TranslateService } from "@ngx-translate/core";
import { GlobalTranslateService } from "../services/global-translate.service";

/**
 * @class ClientApplicationResolver
 * @description The resolver for the client application.
 */
@Injectable()
export class ClientApplicationResolver implements Resolve<UserInfo> {
  /**
  * @description The users service
  * @type {UsersService}
  */
  private readonly userService: UsersService = inject(UsersService);

  /**
   * @description The loading service
   * @returns {LoadingService}
   */
  protected readonly loadingService: LoadingService = inject(LoadingService)

  /**
   * @description The global translate service
   * @type {GlobalTranslateService}
   */
  private readonly globalTranslateService: GlobalTranslateService = inject(GlobalTranslateService);

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserInfo> {
      if(this.userService.currentUserId) {
            this.loadingService.startLoading();
            const userInfo = await this.userService.getUserInfo(this.userService.currentUserId);
            this.loadingService.endLoading();
            if(userInfo) {
                this.globalTranslateService.changeLanguage(userInfo.language);
                return userInfo;
            }
        }

        return undefined;
    }
}