import { Component } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { BaseRequestComponent } from "../base-request.component";

/**
 * @class ClientReportTripComponent
 * @description The report trip component
 */
@Component({
  selector: 'client-report-trip',
  templateUrl: './report-trip.component.html',
  styleUrls: ['../request.scss'],
  providers: [CurrentFormService]
})
export class ClientReportTripComponent extends BaseRequestComponent {
  /**
   * @description The currency of the user
   * @type {string}
   */
  protected readonly userCurrency = this.userCountry.currency;
}
