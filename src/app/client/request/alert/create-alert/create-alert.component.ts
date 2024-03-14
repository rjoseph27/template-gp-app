import { Component, OnInit, inject } from "@angular/core";
import { BaseRequestComponent } from "../../base-request.component";
import { CurrentFormService } from "../../../../services/current-form.service";
import { map, tap } from "rxjs/operators";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { ClientRequestsService } from "../../../service/requests.service";
import { SendItemsRequest } from "../../../service/send-items.service";
import { CreateAlertRequest } from "../../../../api/requests/requests.type";
import { ClientRoutes } from "../../../../client.route";
import { NotificationService } from "../../../../services/notification.service";

/**
 * @class ClientCreateAlertComponent
 * @description The create alert component
 */
@Component({
    selector: 'client-create-alert',
    templateUrl: './create-alert.component.html',
    styleUrls: ['../../request.scss'],
    providers: [CurrentFormService]
})
  export class ClientCreateAlertComponent extends BaseRequestComponent implements OnInit {
    /**
     * @description An observable for the user info
     * @type {Observable<UserInfo>}
     */
    private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']));

    /**
     * @description An observable for the currency
     * @type {Observable<Currency>}
     */
    protected readonly currency$ = this.userInfo$.pipe(map(userInfo => COUNTRY_INFO_LIST.find(x => x.name === userInfo.country).currency));

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The notification service
    * @type {NotificationService}
    */
    protected readonly notificationService: NotificationService = inject(NotificationService);

    /** @inheritdoc */
    ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap(async (loading) => {
        if(loading) {
          const requests = {...this.currentFormService.currentForm.value, userId: this.usersService.currentUserId, currency: this.currency.currency};
          this.requestsService.sendItems({ items: <SendItemsRequest>requests, tripId: null }).then(id => {
            if(id) {
              requests.id = id;
              this.requestsService.createAlert({...<CreateAlertRequest>this.currentFormService.currentForm.value, route: {
                from: requests.userRegion,
                to: requests.destinationRegion
              }, items: requests}).then(success => {
                if(success) {
                  this.notificationService.successNotification('moduleList.client.alerts.createAlert.notification.success');
                  this.router.navigate([ClientRoutes.alertList.fullPath()]);
                } else {
                  this.notificationService.errorNotification('moduleList.client.alerts.createAlert.notification.error');
                }
              })
            }
        })
      }})
    ).subscribe()
  }
}
