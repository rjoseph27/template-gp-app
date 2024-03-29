import { Component, OnInit } from "@angular/core";
import { CurrentFormService } from "../../../../services/current-form.service";
import { BaseAlertComponent } from "../base-alert.component";
import { map, tap } from "rxjs/operators";
import { CreateAlertRequest } from "../../../../api/requests/requests.type";
import { SendItemsRequest } from "../../../service/send-items.service";
import { combineLatest } from "rxjs";
import { ClientRoutes } from "../../../client.route";

/**
 * @class ClientEditAlertComponent
 * @description The edit alert component
 */
@Component({
    selector: 'client-edit-alert',
    templateUrl: './edit-alert.component.html',
    styleUrls: ['../../request.scss'],
    providers: [CurrentFormService]
})
  export class ClientEditAlertComponent extends BaseAlertComponent implements OnInit {
    /**
     * @description The request for the alert
     * @type {Observable<AlertTableElement>}
     */
    protected request$ = this.route.data.pipe(map(data => data['alert']));
    
    /** @inheritdoc */
    ngOnInit(): void {
        combineLatest([this.request$, this.currentFormService.submitting$]).pipe(
            tap(async ([routeData, loading]) => {
              if(loading) {
                    const items = {...this.currentFormService.currentForm.value, userId: this.usersService.currentUserId, currency: this.currency.currency}
                    delete items.from
                    delete items.to
                    delete items.maxPrice
                    const request: CreateAlertRequest = {
                        route: {
                            from: this.currentFormService.currentForm.value.userRegion,
                            to: this.currentFormService.currentForm.value.destinationRegion
                        },
                        items: items,
                        userId: this.usersService.currentUserId,
                        alertId: routeData.alertId,
                        from: this.currentFormService.currentForm.value.from,
                        to: this.currentFormService.currentForm.value.to,
                        maxPrice: this.currentFormService.currentForm.value.maxPrice,
                        itemId: routeData.itemId 
                    };
                    this.requestsService.editAlert(request).then(success => {
                        if(success) {
                            this.notificationService.successNotification('moduleList.client.alerts.editAlert.notification.success');
                            this.router.navigate([ClientRoutes.alertList.fullPath()]);
                        } else {
                            this.notificationService.errorNotification('moduleList.client.alerts.editAlert.notification.error');
                        }
                    })
                    
                }
            })
          ).subscribe()
    }
}