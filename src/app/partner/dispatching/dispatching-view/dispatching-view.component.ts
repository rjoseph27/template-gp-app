import { Component, inject } from "@angular/core";
import { BaseTrackingPageComponent } from "../../../core/layouts/tracking/base-tracking-page.component";
import { PartnerRoutes } from "../../partner.route";
import { Router } from "@angular/router";

/**
 * @class PartnerDispatchingViewComponent
 * @description The partner dispatching view component
 */
@Component({
    selector: 'partner-dispatching-view',
    templateUrl: './dispatching-view.component.html',
    styleUrls: ['./dispatching-view.component.scss']
  })
  export class PartnerDispatchingViewComponent extends BaseTrackingPageComponent {
    /**
    * @description The router service
    * @type {Router}
    */
    protected readonly router: Router = inject(Router);
    
    /**
     * @description The navigate to confirm trip
     * @returns {void}
     */
    protected navigateToConfirmTrip(): void {
      this.router.navigate([PartnerRoutes.confirmTrip.fullPath()], { queryParams: {
        id: this.route.snapshot.data['trip'].id
      }})
    }
  }