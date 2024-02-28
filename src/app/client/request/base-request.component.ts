import { Directive, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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
   * @description The country of the user
   * @type {string}
   */
  protected readonly userCountry = this.route.snapshot.data['userInfo'].country
}