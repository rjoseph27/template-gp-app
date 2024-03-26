import { Component, inject } from "@angular/core";
import { BaseTrackingPageComponent } from "../../../core/layouts/tracking/base-tracking-page.component";
import { PartnerRoutes } from "../../partner.route";
import { ActivatedRoute, Router } from "@angular/router";
import { TripStatus } from "../../../client/orders/base-orders.component";
import { map } from "rxjs";
import { ReportTrip } from "../../../api/requests/requests.type";

/**
 * @class PartnerDispatchingViewComponent
 * @description The partner dispatching view component
 */
@Component({
    selector: 'partner-dispatching-view',
    templateUrl: './dispatching-view.component.html',
    styleUrls: ['./dispatching-view.component.scss']
  })
  export class PartnerDispatchingViewComponent {
    /**
    * @description The router service
    * @type {Router}
    */
    protected readonly router: Router = inject(Router);

    /**
     * @description The activated route
     * @type {ActivatedRoute}
     */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description The status of the trip
     * @type {Observable<string>}
     */
    protected readonly status$ = this.route.data.pipe(map(data => (<ReportTrip>data['trip']).status));

    /**
     * @description The trip status enum
     * @type {TripStatus}
     */
    protected readonly tripStatus = TripStatus;
  }