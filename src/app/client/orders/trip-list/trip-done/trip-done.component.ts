import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { CurrentFormService } from "../../../../services/current-form.service";
import { BaseTripDetailsComponent } from "../base-trip-details.component";

/**
 * @class ClientTripDoneComponent
 * @description The component for the client trip done
 */
@Component({
    selector: 'client-trip-done',
    templateUrl: './trip-done.component.html',
    styleUrls: ['./../base-trip-details.component.scss'],
    providers: [ModalService, CurrentFormService]
  })
  export class ClientTripDoneComponent extends BaseTripDetailsComponent{}