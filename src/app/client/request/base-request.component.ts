import { Directive, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CurrentFormService } from "../../services/current-form.service";
import { UsersService } from "../../services/users.service";

/**
 * @class BaseRequestComponent
 * @description The base request component
 */
@Directive()
export class BaseRequestComponent {
  /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * @description The router service
   * @type {Router}
   */
  protected readonly router: Router = inject(Router);
 
  /**
   * @description The country of the user
   * @type {string}
   */
  protected readonly userCountry = this.route.snapshot.data['userInfo'].country;

  /**
   * @description The users service
   * @type {UsersService}
   */
  protected readonly usersService = inject(UsersService); 

  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  protected readonly currentFormService: CurrentFormService = inject(CurrentFormService);
}