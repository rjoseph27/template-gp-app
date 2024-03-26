import { Component, inject } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";

/**
 * @class GhNotFoundComponent
 * @description The not found component
 */
@Component({
    selector: 'gh-not-found',
    templateUrl: 'not-found.component.html',
    styleUrls: ['./not-found.component.scss']
  })
  export class GhNotFoundComponent {
    /**
    * @description The navigation service
    * @type {NavigationService}
    */
    private readonly navigationService: NavigationService = inject(NavigationService);

    /**
     * @description Redirects to the main page
     * @returns {void}
     */
    protected redirectToMainPage(): void {
        this.navigationService.redirectToMainPage();
    }
  }