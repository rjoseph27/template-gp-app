import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ClientRoutes } from '../client.route';

/**
 * @class NavigationService
 * @description The navigation service
 */
@Injectable()
export class NavigationService {

  /**
   * @description The history of the navigation
   * @type {string[]}
   */
  private readonly history: string[] = [];

  /**
   * @description The angular router service.
   * @type {Router}
   */
  private readonly router: Router = inject(Router);

  /**
   * @constructor
   */
  constructor() {
    // Listen to router events to update history
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.history[this.history.length - 1] !== event.urlAfterRedirects)
        {
            this.history.push(event.urlAfterRedirects);
        }
      }
    });
  }

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
   * @description Determines whether the previous icon should be hidden
   * @returns {boolean}
   */
  hidePreviousIcon(): boolean {
    return this.history.length <= 1;
  }

  /**
   * @description Navigates to the previous page
   * @returns {void}
   */
  goToPreviousPage(): void {
    if (this.history.length > 1) {
      // Pop the current page from history
      this.history.pop();
      // Navigate to the previous page
      const previousUrl = this.history.pop();
      this.router.navigateByUrl(previousUrl);
    } else {
      // If there's no previous page, navigate to the home page or any default page
      this.router.navigateByUrl('/');
    }
  }
}
