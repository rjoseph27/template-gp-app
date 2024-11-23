import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";

/**
 * @class CarrierItemOnHisWayComponent
 * @description The item on his way component
 */
@Component({
    selector: 'carrier-item-on-his-way',
    templateUrl: './item-on-his-way.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class CarrierItemOnHisWayComponent extends BaseGpOrderDetailsComponent {}