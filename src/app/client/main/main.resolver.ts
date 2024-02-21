import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserInfo } from "../../api/users/users.type";
import { UsersService } from "../../services/users.service";
import { LoadingService } from "../../services/loading.service";

/**
 * @class MainPageResolver
 * @description The main page resolver
 */
@Injectable()
export class MainPageResolver implements Resolve<UserInfo> {
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

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UserInfo> {
      if(this.userService.currentUserId) {
            this.loadingService.startLoading();
            const userInfo = await this.userService.getUserInfo(this.userService.currentUserId);
            this.loadingService.endLoading();
            if(userInfo) {
                return userInfo;
            }
        }

        return undefined;
    }
}