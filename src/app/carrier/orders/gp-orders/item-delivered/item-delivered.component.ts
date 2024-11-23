import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";

/**
 * @class CarrierItemDeliveredGpComponent
 * @description The item delivered component
 */
@Component({
    selector: 'carrier-item-delivered-gp',
    templateUrl: './item-delivered.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class CarrierItemDeliveredGpComponent extends BaseGpOrderDetailsComponent {}