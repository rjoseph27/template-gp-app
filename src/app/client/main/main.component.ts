import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserType } from '../user-type.enum';
import { GhModule } from '../../core/layouts/main/main.component';
import { ALERTS_ICON, HELP_ICON, LOG_OUT_ICON, REPORT_TRIP_ICON, SEND_ITEMS_ICON, ORDERS_ICON, REQUESTS_ICON, SETTING_ICON } from './icon';
import { UsersService } from '../../services/users.service';
import { ClientRoutes } from '../client.route';
import { ClientApplicationService } from '../service/application.service';
import { ClientSendItemsService } from '../service/send-items.service';

/**
 * @component ClientMainComponent
 * @description The main component for the client module
 */
@Component({
  selector: 'client-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class ClientMainComponent implements OnInit {
  /**
   * @description The send items service
   * @type {ClientSendItemsService}
   */
  private readonly sendItemsService = inject(ClientSendItemsService);
  
  /**
   * @description The application service
   * @type {ClientApplicationService}
   */
  private readonly applicationService: ClientApplicationService = inject(ClientApplicationService);
  
  /**
   * @description An observable of the current user type translation key
   * @type {Observable<string>}
   */
  protected readonly currentUserTypeTranslationKey$ = this.applicationService.userMode$.pipe(map(userType => 'userType.' + userType));

  /**
   * @description The value of the toggle.
   * @type {boolean}
   */
  protected readonly toggleValue = this.applicationService.userMode === UserType.GP ? true : false;

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
  protected readonly modules$ = this.applicationService.userMode$.pipe(map(userType => userType === UserType.Client ? this.clientModules : this.gpModules));

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
      label: "main.settings.title",
      icon: SETTING_ICON,
      action: () => {}
    },
    {
      label: "main.help.title",
      icon: HELP_ICON,
      action: () => {}
    },
    {
      label: "main.logOut.title",
      icon: LOG_OUT_ICON,
      action: () => this.userService.logout()
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
      action: () => this.router.navigate([ClientRoutes.sendItems.fullPath()])
    },
    {
      label: "moduleList.client.orders.title",
      icon: REQUESTS_ICON,
      action: () => this.router.navigate([ClientRoutes.clientOrder.fullPath()])
    },
    {
      label: "moduleList.client.alerts.title",
      icon: ALERTS_ICON,
      action: () => this.router.navigate([ClientRoutes.alertList.fullPath()])
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
      action: () => this.router.navigate([ClientRoutes.reportTrip.fullPath()])
    },
    {
      label: "moduleList.gp.orders.title",
      icon: ORDERS_ICON,
      action: () => this.router.navigate([ClientRoutes.gpOrders.fullPath()])
    },
    {
      label: "moduleList.gp.trip.title",
      icon: REQUESTS_ICON,
      action: () => this.router.navigate([ClientRoutes.tripList.fullPath()])
    },
    ...this.commonModules
  ]

  /** @inheritdoc */
  ngOnInit(): void {
    this.sendItemsService.requests = undefined;
  }

  /**
   * @description A method that switch the user mode
   * @param value A boolean that is indicating the user mode is GP or not
   * @returns {void}
   */
  protected switchMode(value: boolean): void {
    if(!value) {
      this.applicationService.userMode = UserType.Client;
    } else {
      this.applicationService.userMode = UserType.GP;
    }
  }
}
