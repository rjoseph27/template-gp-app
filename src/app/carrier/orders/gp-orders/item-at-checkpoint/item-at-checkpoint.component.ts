import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";

/**
 * @class CarrierItemAtCheckpointComponent
 * @description The item at checkpoint component
 */
@Component({
    selector: 'carrier-item-at-checkpoint',
    templateUrl: './item-at-checkpoint.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class CarrierItemAtCheckpointComponent extends BaseGpOrderDetailsComponent {}