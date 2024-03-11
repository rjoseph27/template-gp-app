import { Component } from "@angular/core";
import { baseClientOrderDetailsComponent } from "../base-client-order-details.component";
import { ModalService } from "../../../../services/modal.service";

/**
 * @class ClientItemWithGpComponent
 * @description The item with GP component
 */
@Component({
    selector: 'client-item-with-gp',
    templateUrl: './item-with-gp.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientItemWithGpComponent extends baseClientOrderDetailsComponent {}