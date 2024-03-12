import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";

/**
 * @class ClientGpItemAtCheckpointComponent
 * @description The item at checkpoint component
 */
@Component({
    selector: 'client-item-at-checkpoint',
    templateUrl: './item-at-checkpoint.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientGpItemAtCheckpointComponent extends BaseGpOrderDetailsComponent {}