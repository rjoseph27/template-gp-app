import { AfterContentChecked, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { COUNTRY_INFO_LIST } from '../../misc/constants/countries/countries';
import { ClientRoutes } from '../client.route';
import { AlertTableElement } from '../../core/layouts/alert-table/alert-table.component';
import { ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';
import { ClientRequestsService } from '../service/requests.service';

/**
 * @class ClientAlertListComponent
 * @description The alert list component
 */
@Component({
    selector: 'client-alert-list',
    templateUrl: './alert-list.component.html',
    styleUrls: ['./alert-list.component.scss'],
    providers: [ModalService]
})
  export class ClientAlertListComponent implements AfterContentChecked {
   /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
    private readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description An observable for the currency
     * @type {Observable<Currency>}
     */
    protected readonly currency$ = this.route.data.pipe(map(data => COUNTRY_INFO_LIST.find(x => x.name === data['userInfo'].country).currency.currency));



    /**
     * @description The edit table factory
     * @type {(row: AlertTableElement) => void}
     */
    protected readonly editTableFactory = (row: AlertTableElement) => {
      this.router.navigate([ClientRoutes.editAlert.fullPath()], { queryParams: {
        id: row.id
      }})
    }

    /**
    * @description The modal service
    * @type {ModalService}
    */
    protected readonly modalService: ModalService = inject(ModalService);

    /**
    * @description The notification service
    * @type {NotificationService}
    */
    protected readonly notificationService: NotificationService = inject(NotificationService);

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    protected readonly requestsService = inject(ClientRequestsService);

    /**
     * @description The delete table factory
     * @type {(row: AlertTableElement) => Promise<boolean>}
     */
    protected readonly deleteTableFactory = async (row: AlertTableElement) => {
      return await this.modalService.openModal({
        title: "moduleList.client.alerts.deleteAlert.title",
        text: "moduleList.client.alerts.deleteAlert.content",
        confirmCaption: "moduleList.client.alerts.deleteAlert.acceptButton",
        cancelCaption: "moduleList.client.alerts.deleteAlert.rejectButton"
      }).then(async x => {
        if(x) {
          const isCanceledSucessfully = await this.requestsService.deleteAlert(row);
          if(isCanceledSucessfully) {
            this.notificationService.successNotification('moduleList.client.alerts.deleteAlert.notification.success');
          } else {
            this.notificationService.errorNotification('moduleList.client.alerts.deleteAlert.notification.error');
          }
          return isCanceledSucessfully;
        }
        return false;
      });
    }

    /**
     * @description An observable for the alert list
     * @type {Observable<AlertTableElement[]>}
     */
    protected readonly alertList$ = this.route.data.pipe(map(data => data['alertList']));

    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
    * @description The angular router service.
    * @type {Router}
    */
    private readonly router: Router = inject(Router);

    /** @inheritdoc */
    ngAfterContentChecked() {
      this.changeDetectorRef.detectChanges();
    }

    /**
     * @description Create an alert
     * @returns {void}
     */
    protected createAlert() {
      this.router.navigate([ClientRoutes.createAlert.fullPath()])
    }
  }