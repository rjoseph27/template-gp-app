import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NavigationService } from '../../../../services/navigation.service';

/**
 * @class GhEmailActivationComponent
 * @description The email activation component
 */
@Component({
  selector: 'gh-email-activation',
  templateUrl: './email-activation.component.html',
})
export class GhEmailActivationComponent {
  /**
   * @description The angular router service.
   * @type {ActivatedRoute}
   */
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * @description The navigation service
   * @type {NavigationService}
   */
  private readonly navigationService: NavigationService = inject(NavigationService)

  /**
   * @description The button resolver
   * @type {() => void}
   */
  protected readonly buttonResolver = this.navigationService.redirectToMainPage; 

  /**
   * @description The translation key
   * @type {string}
   */
  private get translationKey(): string {
    return this.route.snapshot.data['emailActivationStatus'];
  }

  /**
   * @description The title of the email activation
   * @type {string}
   */
  protected get title(): string {
    return `global.emailActivation.${this.translationKey}.title`;
  }

  /**
   * @description The message of the email activation
   * @type {string}
   */
  protected get message(): string {
    return `global.emailActivation.${this.translationKey}.content`;
  }
}
