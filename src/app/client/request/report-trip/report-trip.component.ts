import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { BaseRequestComponent } from "../base-request.component";
import { tap } from "rxjs/operators";
import { ClientRequestsService } from "../../service/requests.service";
import { NotificationService } from "../../../services/notification.service";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { ClientRoutes } from "../../../client.route";
import { FormMode } from "../../../misc/enums/form-mode.enum";

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
  protected readonly userCurrency = COUNTRY_INFO_LIST.find(x => x.name === this.userCountry).currency;

  /**
   * @description The change detector reference
   * @type {ChangeDetectorRef}
   */
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  /**
   * @description The requests service
   * @type {ClientRequestsService}
   */
  private readonly requestsService: ClientRequestsService = inject(ClientRequestsService);

  /**
   * @description The notification service
   * @type {NotificationService}
   */
  private readonly notificationService: NotificationService = inject(NotificationService);

  /**
   * @description The form mode enum for template use.
   * @type {FormMode}
   */
  protected readonly formMode = FormMode;

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap(async (loading) => {
        if(loading) {
          const res = await this.requestsService.reportTrip({
            ...this.currentFormService.currentForm.value, 
            userId: this.usersService.currentUserId,
            currency: this.userCurrency.currency
          });
          if(res) {
            this.notificationService.successNotification("moduleList.gp.reportTrip.notification.success");
            this.router.navigate([ClientRoutes.tripList.fullPath()]);
          } else {
             this.notificationService.errorNotification("moduleList.gp.reportTrip.notification.failure");
          }
        }
      })
    ).subscribe()
  }

  /** @inheritdoc */
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }
}
