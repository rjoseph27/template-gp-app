import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { CurrentFormService } from "../../../../services/current-form.service";
import { BaseTripDetailsComponent } from "../base-trip-details.component";

/**
 * @class CarrierTripDoneComponent
 * @description The component for the carrier trip done
 */
@Component({
    selector: 'carrier-trip-done',
    templateUrl: './trip-done.component.html',
    styleUrls: ['./../base-trip-details.component.scss'],
    providers: [ModalService, CurrentFormService]
  })
  export class CarrierTripDoneComponent extends BaseTripDetailsComponent{}