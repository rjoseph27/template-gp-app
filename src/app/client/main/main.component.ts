import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { UserType } from '../user-type.enum';
import { GhModule } from '../../core/layouts/main/main.component';
import { ALERTS_ICON, HELP_ICON, LOG_OUT_ICON, REPORT_TRIP_ICON, SEND_ITEMS_ICON, ORDERS_ICON, REQUESTS_ICON, SETTING_ICON } from './icon';
import { UsersService } from '../../services/users.service';
import { ClientRoutes } from '../../client.route';

/**
 * @component ClientMainComponent
 * @description The main component for the client module
 */
@Component({
  selector: 'client-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class ClientMainComponent {
  /**
   * @description Backing field for the user type
   * @type {BehaviorSubject<UserType>}
   */
  private readonly _userType$ = new BehaviorSubject<UserType>(UserType.Client);

  /**
   * @description An observable for the user type
   * @type {Observable<UserType>}
   */
  private readonly userType$ = this._userType$.asObservable();

  /**
   * @description An observable of the current user type translation key
   * @type {Observable<string>}
   */
  protected readonly currentUserTypeTranslationKey$ = this.userType$.pipe(map(userType => 'userType.' + userType));

  /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * @description An observable for the user info
   * @type {Observable<string>}
   */
  private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']));

  /**
   * @description An observable for the modules
   * @type {Observable<GhModule[]>}
   */
  protected readonly modules$ = this.userType$.pipe(map(userType => userType === UserType.Client ? this.clientModules : this.gpModules));

  /**
   * @description An observable for the user full name
   * @type {Observable<string>}
   */
  protected readonly userFullName$ = this.userInfo$.pipe(map(userInfo => userInfo.firstName + ' ' + userInfo.lastName));

  /**
   * @description The angular router service.
   * @type {Router}
   */
  private readonly router: Router = inject(Router);

  /**
  * @description The users service
  * @type {UsersService}
  */
  private readonly userService: UsersService = inject(UsersService);
  
  /**
   * @description The common modules for the application
   * @type {GhModule[]}
   */
  private readonly commonModules: GhModule[] = [
    {
      label: "moduleList.global.settings.title",
      icon: SETTING_ICON,
      action: () => {}
    },
    {
      label: "moduleList.global.help.title",
      icon: HELP_ICON,
      action: () => {}
    },
    {
      label: "moduleList.global.logOut.title",
      icon: LOG_OUT_ICON,
      action: () => {
        this.userService.logout();
      }
    },
  ]

  /**
   * @description The client modules for the application
   * @type {GhModule[]}
   */
  private readonly clientModules: GhModule[] = [
    {
      label: "moduleList.client.sendItems.title",
      icon: SEND_ITEMS_ICON,
      action: () => {
        this.router.navigate([ClientRoutes.sendItems.fullPath()]);
      }
    },
    {
      label: "moduleList.client.orders.title",
      icon: REQUESTS_ICON,
      action: () => {}
    },
    {
      label: "moduleList.client.alerts.title",
      icon: ALERTS_ICON,
      action: () => {}
    },
    ...this.commonModules
  ]

  /**
   * @description The GP modules for the application
   * @type {GhModule[]}
   */
  private readonly gpModules: GhModule[] = [
    {
      label: "moduleList.gp.reportTrip.title",
      icon: REPORT_TRIP_ICON,
      action: () => {
        this.router.navigate([ClientRoutes.reportTrip.fullPath()]);
      }
    },
    {
      label: "moduleList.gp.trip.title",
      icon: REQUESTS_ICON,
      action: () => {}
    },
    {
      label: "moduleList.gp.orders.title",
      icon: ORDERS_ICON,
      action: () => {}
    },
    ...this.commonModules
  ]

  /**
   * @description A method that switch the user mode
   * @param value A boolean that is indicating the user mode is GP or not
   * @returns {void}
   */
  protected switchMode(value: boolean): void {
    if(!value) {
      this._userType$.next(UserType.Client);
    } else {
      this._userType$.next(UserType.GP);
    }
  }
}
