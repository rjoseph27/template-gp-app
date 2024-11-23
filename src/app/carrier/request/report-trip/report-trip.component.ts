import { Component, OnInit, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { BaseRequestComponent } from "../base-request.component";
import { tap } from "rxjs/operators";
import { NotificationService } from "../../../services/notification.service";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { FormMode } from "../../../misc/enums/form-mode.enum";
import { CarrierRoutes } from "../../carrier.route";
import { CarrierRequestsService } from "../../service/requests.service";

/**
 * @class CarrierReportTripComponent
 * @description The report trip component
 */
@Component({
  selector: 'carrier-report-trip',
  templateUrl: './report-trip.component.html',
  styleUrls: ['../request.scss', './report-trip.component.scss'],
  providers: [CurrentFormService]
})
export class CarrierReportTripComponent extends BaseRequestComponent implements OnInit {
  /**
   * @description The currency of the user
   * @type {string}
   */
  protected readonly userCurrency = COUNTRY_INFO_LIST.find(x => x.name === this.userCountry).currency;

  /**
   * @description The requests service
   * @type {CarrierRequestsService}
   */
  private readonly requestsService: CarrierRequestsService = inject(CarrierRequestsService);

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
            this.router.navigate([CarrierRoutes.tripList.fullPath()]);
          } else {
             this.notificationService.errorNotification("moduleList.gp.reportTrip.notification.failure");
          }
        }
      })
    ).subscribe()
  }
}
