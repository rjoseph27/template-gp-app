import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { BaseRequestComponent } from "../base-request.component";
import { tap } from "rxjs/operators";
import { RequestsService } from "../../service/requests.service";

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
export class ClientReportTripComponent extends BaseRequestComponent implements OnInit, AfterContentChecked {
  /**
   * @description The currency of the user
   * @type {string}
   */
  protected readonly userCurrency = this.userCountry.currency;

  /**
   * @description The change detector reference
   * @type {ChangeDetectorRef}
   */
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  /**
   * @description The requests service
   * @type {RequestsService}
   */
  private readonly requestsService: RequestsService = inject(RequestsService);

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap((loading) => {
        if(loading) {
          this.requestsService.reportTrip({...this.currentFormService.currentForm.value, userId: this.usersService.currentUserId});
        }
      })
    ).subscribe()
  }

  /** @inheritdoc */
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }
}
