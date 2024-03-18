import { Component } from "@angular/core";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";
import { map } from "rxjs/operators";
import { ModalService } from "../../../services/modal.service";

/**
 * @class PartnerRegisterItemViewComponent
 * @description The partner register item view component
 */
@Component({
    selector: 'partner-register-item-view',
    templateUrl: './register-item-view.component.html',
    styleUrls: ['./../register-item.component.scss'],
    providers: [ModalService]
  })
  export class PartnerRegisterItemViewComponent extends BaseOrderDetailsComponent {
    /**
     * @description The currency of the order
     * @type {Observable<string>}
     */
    protected readonly currency$ = this.orderDetail$.pipe(map(orderDetails => orderDetails.currency));
  }