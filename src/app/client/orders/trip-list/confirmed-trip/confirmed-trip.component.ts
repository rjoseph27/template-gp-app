import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { CurrentFormService } from "../../../../services/current-form.service";
import { BaseTripDetailsComponent } from "../base-trip-details.component";


/**
 * @class ClientConfirmedTripComponent
 * @description The confirmed trip component for the client module
 */
@Component({
    selector: 'client-confirmed-trip',
    templateUrl: './confirmed-trip.component.html',
    styleUrls: ['./../base-trip-details.component.scss'],
    providers: [ModalService, CurrentFormService]
  })
  export class ClientConfirmedTripComponent extends BaseTripDetailsComponent{}