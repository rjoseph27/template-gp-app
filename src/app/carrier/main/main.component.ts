import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { GhModule } from '../../core/layouts/main/main.component';
import { HELP_ICON, LOG_OUT_ICON, REPORT_TRIP_ICON, ORDERS_ICON, REQUESTS_ICON, SETTING_ICON } from './icon';
import { UsersService } from '../../services/users.service';
import { CarrierRoutes } from '../carrier.route';

/**
 * @component CarrierMainComponent
 * @description The main component for the carrier module
 */
@Component({
  selector: 'carrier-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class CarrierMainComponent {
  /**
   * @description A boolean value that determines if the body of the main component should be displayed or not
   * @type {boolean}
   */
  @Input() displayBody = true;

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
   * @description An observable for the user full name
   * @type {Observable<string>}
   */
  protected readonly userFullName$ = this.userInfo$.pipe(
    map(userInfo => userInfo.firstName + ' ' + userInfo.lastName)
  );

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
   * @description The GP modules for the application
   * @type {GhModule[]}
   */
  protected readonly modules: GhModule[] = [
    {
      label: "moduleList.gp.reportTrip.title",
      icon: REPORT_TRIP_ICON,
      action: () => this.router.navigate([CarrierRoutes.reportTrip.fullPath()])
    },
    {
      label: "moduleList.gp.orders.title",
      icon: ORDERS_ICON,
      action: () => this.router.navigate([CarrierRoutes.gpOrders.fullPath()])
    },
    {
      label: "moduleList.gp.trip.title",
      icon: REQUESTS_ICON,
      action: () => this.router.navigate([CarrierRoutes.tripList.fullPath()])
    },
    ...this.commonModules
  ]
}
