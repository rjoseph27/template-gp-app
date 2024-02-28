import { AfterContentChecked, ChangeDetectorRef, Component, inject } from "@angular/core";
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
export class ClientReportTripComponent extends BaseRequestComponent implements AfterContentChecked {
  /**
   * @description The currency of the user
   * @type {string}
   */
  protected readonly userCurrency = this.userCountry.currency;

  /**
   * @description The change detector reference
   * @type {ChangeDetectorRef}
   */
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef)

  /** @inheritdoc */
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }
}
