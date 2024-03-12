import { Component } from "@angular/core";
import { BaseClientOrderDetailsComponent } from "../base-client-order-details.component";
import { ModalService } from "../../../../services/modal.service";

/**
 * @class ClientWaitingGpConfirmationComponent
 * @description The waiting for GP confirmation component
 */
@Component({
    selector: 'client-waiting-gp-confirmation',
    templateUrl: './waiting-gp-confirmation.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientWaitingGpConfirmationComponent extends BaseClientOrderDetailsComponent {}