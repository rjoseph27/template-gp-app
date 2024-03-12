import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";

/**
 * @class ClientItemWithYouComponent
 * @description The item with you component
 */
@Component({
    selector: 'client-item-with-you',
    templateUrl: './item-with-you.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientItemWithYouComponent extends BaseGpOrderDetailsComponent {}