import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { GhModule } from '../../core/layouts/main/main.component';
import { HELP_ICON, LOG_OUT_ICON, SETTING_ICON } from './icon';
import { UsersService } from '../../services/users.service';

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
