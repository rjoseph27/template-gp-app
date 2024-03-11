import { Component } from "@angular/core";
import { baseClientOrderDetailsComponent } from "../base-client-order-details.component";
import { ModalService } from "../../../../services/modal.service";

/**
 * @class ClientItemAtCheckPointComponent
 * @description The item at checkpoint component
 */
@Component({
    selector: 'client-item-at-checkpoint',
    templateUrl: './item-at-checkpoint.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientItemAtCheckPointComponent extends baseClientOrderDetailsComponent {}