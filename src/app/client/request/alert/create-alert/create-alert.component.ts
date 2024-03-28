import { Component, OnInit } from "@angular/core";
import { CurrentFormService } from "../../../../services/current-form.service";
import { tap } from "rxjs/operators";
import { SendItemsRequest } from "../../../service/send-items.service";
import { CreateAlertRequest } from "../../../../api/requests/requests.type";
import { ClientRoutes } from "../../../client.route";
import { BaseAlertComponent } from "../base-alert.component";

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
  export class ClientCreateAlertComponent extends BaseAlertComponent implements OnInit {
    /** @inheritdoc */
    ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap(async (loading) => {
        if(loading) {
          const requests = {...this.currentFormService.currentForm.value, userId: this.usersService.currentUserId, currency: this.currency.currency};
          const items = {...requests}
          delete items.from
          delete items.to
          delete items.maxPrice
          this.requestsService.createAlert({...<CreateAlertRequest>this.currentFormService.currentForm.value, route: {
                from: requests.userRegion,
                to: requests.destinationRegion
              }, items: items}).then(success => {
                if(success) {
                  this.notificationService.successNotification('moduleList.client.alerts.createAlert.notification.success');
                  this.router.navigate([ClientRoutes.alertList.fullPath()]);
                } else {
                  this.notificationService.errorNotification('moduleList.client.alerts.createAlert.notification.error');
                }
              })
      }})
    ).subscribe()
  }
}
