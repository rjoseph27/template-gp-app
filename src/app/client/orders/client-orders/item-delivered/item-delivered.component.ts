import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { baseClientOrderDetailsComponent } from "../base-client-order-details.component";

/**
 * @class ClientItemDeliveredComponent
 * @description The item delivered component
 */
@Component({
    selector: 'client-item-delivered',
    templateUrl: './item-delivered.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientItemDeliveredComponent extends baseClientOrderDetailsComponent {}