import { CanActivate, Router } from "@angular/router";
import { UsersService } from "../../services/users.service";
import { inject } from "@angular/core";
import { NavigationService } from "../../services/navigation.service";

/**
 * @class LoggedOutGuard
 * @description A route guard that check if the user is logged out.
 */
export class LoggedOutGuard implements CanActivate { 
    /**
    * @description The users service
    * @type {UsersService}
    */
    private readonly userService: UsersService = inject(UsersService);

    /**
    * @description The navigation service
    * @type {NavigationService}
    */
    private readonly navigationService: NavigationService = inject(NavigationService);

    /** @inheritdoc */
    canActivate(): boolean {
      if (!this.userService.currentUserId) {
        return true;
      } else {
        this.navigationService.redirectToApplication();
        return false;
      }
    }
  }