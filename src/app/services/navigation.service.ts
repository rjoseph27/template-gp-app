import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ClientRoutes } from '../client/client.route';
import { GlobalRoutes } from '../global.route';
import { GhRoute } from '../misc/classes/route';
import { PartnerRoutes } from '../partner/partner.route';

/**
 * @class NavigationService
 * @description The navigation service
 */
@Injectable()
export class NavigationService {
  /**
   * @description The angular router service.
   * @type {Router}
   */
  private readonly router: Router = inject(Router);

  /**
   * @description Redirects to the main page
   * @returns {void}
   */
  redirectToMainPage(): void {
    if(this.router.url.split("/")[1] === PartnerRoutes.partner.segment)
    {
      this.router.navigate([PartnerRoutes.partner.fullPath()]);
    } else {
      this.router.navigate([ClientRoutes.client.fullPath()]);
    }
  }

  redirectToApplication(): void {
    if(this.router.url.split("/")[1] === PartnerRoutes.partner.segment)
    {
      this.router.navigate([PartnerRoutes.main.fullPath()]);
    } else {
      this.router.navigate([ClientRoutes.main.fullPath()]);
    }
  }

  /**
   * @description Gets the current route
   * @returns {GhRoute}
   */
  private get currentRoute(): GhRoute {
    const urlAsArray = this.router.url.split('?')[0].split('/');
    const currentPage = urlAsArray.pop();
    let routingArray;
    if(urlAsArray[1] === ClientRoutes.client.segment)
    {
        routingArray = Object.values(ClientRoutes);
    } else {
        routingArray = Object.values(PartnerRoutes);
    }
    return [...routingArray, ...Object.values(GlobalRoutes)].find((route) => route.segment === currentPage)
  }

  /**
   * @description Determines whether the previous icon should be hidden
   * @returns {boolean}
   */
  hidePreviousIcon(): boolean {
    return this.currentRoute?.parentRoute === ClientRoutes.client || this.currentRoute?.parentRoute === PartnerRoutes.partner || !this.currentRoute?.parentRoute;
  }

  /**
   * @description Navigates to the previous page
   * @returns {void}
   */
  goToPreviousPage(): void {
    if(this.currentRoute?.parentRoute.currentParams) {
      this.router.navigate([this.currentRoute?.parentRoute.fullPath()], { queryParams: this.currentRoute?.parentRoute.currentParams });
    } else {
      this.router.navigate([this.currentRoute?.parentRoute.fullPath()]);
    }
  }
}
