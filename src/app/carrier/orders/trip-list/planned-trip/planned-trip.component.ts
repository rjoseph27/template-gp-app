import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { CurrentFormService } from "../../../../services/current-form.service";
import { BaseTripDetailsComponent } from "../base-trip-details.component";

/**
 * @class CarrierPlannedTripComponent
 * @description The planned trip component for the carrier module
 */
@Component({
    selector: 'carrier-planned-trip',
    templateUrl: './planned-trip.component.html',
    styleUrls: ['./../base-trip-details.component.scss'],
    providers: [ModalService, CurrentFormService]
  })
  export class CarrierPlannedTripComponent extends BaseTripDetailsComponent{}