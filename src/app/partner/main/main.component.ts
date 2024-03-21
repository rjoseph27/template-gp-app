import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { GhModule } from '../../core/layouts/main/main.component';
import { BILLING_ICON, DISPATCH_ICON, GP_PICK_UP_ICON, HELP_ICON, LOG_OUT_ICON, RECEIVING_ITEM_ICON, REGISTER_ITEM_ICON, SETTING_ICON } from './icon';
import { UsersService } from '../../services/users.service';
import { PartnerRoutes } from '../partner.route';

/**
 * @component PartnerMainComponent
 * @description The main component for the partner module
 */
@Component({
  selector: 'partner-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class PartnerMainComponent {
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
  protected readonly userFullName$ = this.userInfo$.pipe(map(userInfo => userInfo.firstName + ' ' + userInfo.lastName));

  /**
   * @description An observable for the user succursale
   * @type {Observable<string>}
   */
  protected readonly succursale$ = this.userInfo$.pipe(map(userInfo => userInfo.succursale));

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
  protected readonly modules: GhModule[] = [
    {
      label: "moduleList.registerItem.title",
      icon: REGISTER_ITEM_ICON,
      action: () => this.router.navigate([PartnerRoutes.registerItem.fullPath()])
    },
    {
      label: "moduleList.gpPickUp.title",
      icon: GP_PICK_UP_ICON,
      action: () => this.router.navigate([PartnerRoutes.gpPickUp.fullPath()])
    },
    {
      label: "moduleList.dispatching.title",
      icon: DISPATCH_ICON,
      action: () => {}
    },
    {
      label: "moduleList.receivingItem.title",
      icon: RECEIVING_ITEM_ICON,
      action: () => {}
    },
    {
      label: "moduleList.billing.title",
      icon: BILLING_ICON,
      action: () => this.router.navigate([PartnerRoutes.billing.fullPath()])
    },
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
}
