import { Component } from "@angular/core";
import { map } from "rxjs/operators";
import { BaseTrackingPageComponent } from "../../../../core/layouts/tracking/base-tracking-page.component";
import { ModalService } from "../../../../services/modal.service";

/**
 * @class ClientOrderTrackingComponent
 * @description The client order tracking component
 */
@Component({
    selector: 'client-order-tracking',
    templateUrl: './order-tracking.component.html',
    styleUrls: ['./order-tracking.component.scss'],
    providers: [ModalService]
  })
  export class ClientOrderTrackingComponent extends BaseTrackingPageComponent {
    /**
    * @description An observable for the order id
    * @type {Observable<string>}
    */
    protected readonly orderId$ = this.route.queryParamMap.pipe(map(params => params.get('id')));
  }