import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ClientRoutes } from '../client.route';
import { GlobalRoutes } from '../global.route';
import { GhRoute } from '../misc/classes/route';

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
    if(this.router.url[0] === ClientRoutes.client.segment)
    {
        this.router.navigate([ClientRoutes.client.fullPath()]);
    } else {
        this.router.navigate([ClientRoutes.client.fullPath()]);
    }
    // TODO add entreprise main page
  }

  redirectToApplication(): void {
    if(this.router.url[0] === ClientRoutes.client.segment)
    {
        this.router.navigate([ClientRoutes.main.fullPath()]);
    } else {
        this.router.navigate([ClientRoutes.main.fullPath()]);
    }

    // TODO add entreprise main page
  }

  /**
   * @description Gets the current route
   * @returns {GhRoute}
   */
  private get currentRoute(): GhRoute {
    const urlAsArray = this.router.url.split('/');
    const currentPage = urlAsArray.pop();
    return [...Object.values(ClientRoutes), ...Object.values(GlobalRoutes)].find((route) => route.segment === currentPage)
  }

  /**
   * @description Determines whether the previous icon should be hidden
   * @returns {boolean}
   */
  hidePreviousIcon(): boolean {
    return this.currentRoute?.parentRoute === ClientRoutes.client;
    // TODO ADAPT TO ENTERPRISE
  }

  /**
   * @description Navigates to the previous page
   * @returns {void}
   */
  goToPreviousPage(): void {
    this.router.navigate([this.currentRoute?.parentRoute.fullPath()]);
    // TODO ADAPT TO ENTERPRISE
  }
}
