import { Component } from "@angular/core";
import { BaseTrackingPageComponent } from "../../../core/layouts/tracking/base-tracking-page.component";

/**
 * @class PartnerDispatchingViewComponent
 * @description The partner dispatching view component
 */
@Component({
    selector: 'partner-dispatching-view',
    templateUrl: './dispatching-view.component.html',
    styleUrls: ['./dispatching-view.component.scss']
  })
  export class PartnerDispatchingViewComponent extends BaseTrackingPageComponent {}