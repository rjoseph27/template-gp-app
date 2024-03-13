import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { CurrentFormService } from "../../../../services/current-form.service";
import { BaseTripDetailsComponent } from "../base-trip-details.component";

/**
 * @class ClientPlannedTripComponent
 * @description The planned trip component for the client module
 */
@Component({
    selector: 'client-planned-trip',
    templateUrl: './planned-trip.component.html',
    styleUrls: ['./../base-trip-details.component.scss'],
    providers: [ModalService, CurrentFormService]
  })
  export class ClientPlannedTripComponent extends BaseTripDetailsComponent{}