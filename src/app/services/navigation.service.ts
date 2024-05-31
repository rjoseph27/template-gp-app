import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';
import { ClientRoutes } from '../client/client.route';
import { GlobalRoutes } from '../global.route';
import { GhRoute } from '../misc/classes/route';
import { PartnerRoutes } from '../partner/partner.route';
import { BehaviorSubject, skip, take, takeUntil, tap } from 'rxjs';

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
   * @description Backing field for the last url
   * @type {BehaviorSubject<string>}
   */
  private readonly _lastUrl$ = new BehaviorSubject<string>(undefined);

  /**
   * @description The last url
   * @type {BehaviorSubject<string>}
  */
  set lastUrl(value: string) {
    this._lastUrl$.next(value);
  }
  get lastUrl() {
    return this._lastUrl$.value;
  }

  /**
   * @description Backing field for the notification message
   * @type {BehaviorSubject<string>}
   */
  private readonly _isNotificationOpen$ = new BehaviorSubject<boolean>(false);

  /**
   * @description Backing field for the redirect url
   * @type {BehaviorSubject<string>}
   */
  private readonly _redirectUrl$ = new BehaviorSubject<string>(undefined);

  /**
   * @description Determines whether the notification is open
   * @type {BehaviorSubject<boolean>}
  */
  set isNotificationOpen(value: boolean) {
    this._isNotificationOpen$.next(value);
  }
  get isNotificationOpen() {
    return this._isNotificationOpen$.value;
  }   

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

  /**
   * @description Redirects to the application
   * @returns {void}
   */
  redirectToApplication(): void {
    if(this._redirectUrl$.value) {
      this.router.navigateByUrl(this._redirectUrl$.value);
      this._redirectUrl$.next(undefined);
    } else {
      if(this.router.url.split("/")[1] === PartnerRoutes.partner.segment)
        {
          this.router.navigate([PartnerRoutes.main.fullPath()]);
        } else {
          this.router.navigate([ClientRoutes.main.fullPath()]);
        }
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

  /**
   * @constructor
  */
  constructor() {
    this.router.events.pipe(tap((e) => {
      if((<NavigationCancel>e).id === 1 && (<NavigationCancel>e).reason) {
        this._redirectUrl$.next((<NavigationCancel>e).url);
      }

      if(e instanceof NavigationEnd) {
            this._lastUrl$.next((<NavigationEnd>e).url);
        }
    }), takeUntil(this._lastUrl$.asObservable().pipe(skip(1)))).subscribe()
}
}
