import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { ReportTrip } from "../../../../api/requests/requests.type";
import { SUCCURSALE_BY_COUNTRY } from "../../../../misc/constants/countries/countries.type";
import { BaseTrackingPageComponent } from "../../../../core/layouts/tracking/base-tracking-page.component";

/**
 * @class ClientOrderTrackingComponent
 * @description The client order tracking component
 */
@Component({
    selector: 'client-order-tracking',
    templateUrl: './order-tracking.component.html',
    styleUrls: ['./order-tracking.component.scss']
  })
  export class ClientOrderTrackingComponent extends BaseTrackingPageComponent {}