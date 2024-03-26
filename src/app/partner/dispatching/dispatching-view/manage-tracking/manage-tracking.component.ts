import { Component, inject } from "@angular/core";
import { BaseTrackingPageComponent } from "../../../../core/layouts/tracking/base-tracking-page.component";
import { map } from "rxjs/operators";
import { ReportTrip } from "../../../../api/requests/requests.type";
import { SelectFieldOption } from "../../../../core/elements/input/select-field/select-field.component";
import { BehaviorSubject, Observable } from "rxjs";
import { DeliveryExceptionType, TrackingPoint, TrackingPointType } from "../../../../core/layouts/tracking/tracking.type";
import { ClientRequestsService } from "../../../../client/service/requests.service";
import { ModalService } from "../../../../services/modal.service";
import { NotificationService } from "../../../../services/notification.service";
import { Router } from "@angular/router";
import { PartnerRoutes } from "../../../partner.route";

/**
 * @class PartnerManageTrackingComponent
 * @description The partner manage tracking component
 */
@Component({
    selector: 'partner-manage-tracking',
    templateUrl: './manage-tracking.component.html',
    styleUrls: ['./manage-tracking.component.scss'],
    providers: [ModalService]
  })
  export class PartnerManageTrackingComponent extends BaseTrackingPageComponent {
    /**
     * @description The backing field for the current point
     * @type {BehaviorSubject<TrackingPoint>}
     */
    private readonly _currentPoint$ = new BehaviorSubject<TrackingPoint>(undefined);

    /**
     * @description The backing field for the lost order button loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _lostOrderButtonLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the lost order button loading
     * @type {Observable<boolean>}
     */
    protected readonly lostOrderButtonLoading$ = this._lostOrderButtonLoading$.asObservable();

    /**
     * @description The backing field for the damaged order button loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _damagedOrderButtonLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the damaged order button loading
     * @type {Observable<boolean>}
     */
    protected readonly damagedOrderButtonLoading$ = this._damagedOrderButtonLoading$.asObservable();

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The modal service
    * @type {ModalService}
    */
    private readonly modalService: ModalService = inject(ModalService);

    /**
    * @description The angular router service.
    * @type {Router}
    */
    private readonly router: Router = inject(Router);

    /**
    * @description The notification service
    * @type {NotificationService}
    */
    protected readonly notificationService: NotificationService = inject(NotificationService);

    /**
     * @description The current point
     * @type {TrackingPoint}
     */
    protected get currentPoint() {
        return this._currentPoint$.value;
    }

    /**
     * @description The tracking point type
     * @type {TrackingPointType}
     */
    protected readonly trackingPointType = TrackingPointType;

    /**
     * @description The backing field for the order id
     * @type {BehaviorSubject<string>}
     */
    private readonly _orderId$ = new BehaviorSubject<string>(null)

    /**
     * @description An observable for the order id
     * @type {Observable<string>}
     */
    protected readonly orderId$ = this._orderId$.asObservable();

    /**
     * @description The order id
     * @type {string}
     */
    protected set orderId(value: string) {
        this._orderId$.next(value === '*' ? null : value)
        const history = [...(<ReportTrip>this.route.snapshot.data['trip']).history]
        this._currentPoint$.next(history.reverse().find(x => x.orderId === this.orderId))
    }
    protected get orderId() {
        return this._orderId$.value
    }
    
    /**
     * @description An observable for the order list
     * @type {Observable<SelectFieldOption[]>}
     */
    protected readonly orderList$: Observable<SelectFieldOption[]> = this.route.data.pipe(map(data => {
        const options: SelectFieldOption[] = (<ReportTrip>data['trip']).orders.map(key => ({
            value: key.toString(),
            label: key.toString(),
        }))

        options.unshift({
            value: "*",
            label: 'moduleList.dispatching.view.manage.orderList.all'
        })
        return options
    }))

    /**
     * @description A method to generate a lost exception
     * @returns {void}
     */
    protected async lostOrderException(): Promise<void> {
        this.modalService.openModal({
            title: "deliveryExecption.modal.lostOrder.title",
            text: "deliveryExecption.modal.lostOrder.content",
            confirmCaption: "deliveryExecption.modal.button.confirm",
            cancelCaption: "deliveryExecption.modal.button.cancel"
          }).then(async x => {
            if(x) {
              this._lostOrderButtonLoading$.next(true);
              const addHistorySuccessfully = await this.requestsService.addHistory({
                    tripId: this.route.snapshot.data['trip'].id,
                    type: this._currentPoint$.value.type,
                    location: this._currentPoint$.value.location,
                    orderId: this.orderId,
                    exception: DeliveryExceptionType.LOST,
                });
              this._lostOrderButtonLoading$.next(false);
              if(addHistorySuccessfully) {
                this.notificationService.successNotification('deliveryExecption.modal.lostOrder.notification.success');
                this.reloadPage();
              } else {
                this.notificationService.errorNotification('deliveryExecption.modal.lostOrder.notification.error');
              }
            }
          });
    }

    /**
     * @description A method to generate a damaged exception
     * @returns {void}
     */
    protected async damagedOrderException(): Promise<void> {
        this.modalService.openModal({
            title: "deliveryExecption.modal.damaged.title",
            text: "deliveryExecption.modal.damaged.content",
            confirmCaption: "deliveryExecption.modal.button.confirm",
            cancelCaption: "deliveryExecption.modal.button.cancel"
          }).then(async x => {
            if(x) {
              this._damagedOrderButtonLoading$.next(true);
              const addHistorySuccessfully = await this.requestsService.addHistory({
                    tripId: this.route.snapshot.data['trip'].id,
                    type: this._currentPoint$.value.type,
                    location: this._currentPoint$.value.location,
                    orderId: this.orderId,
                    exception: DeliveryExceptionType.ITEM_DAMAGED,
                });
              this._damagedOrderButtonLoading$.next(false);
              if(addHistorySuccessfully) {
                this.notificationService.successNotification('deliveryExecption.modal.damaged.notification.success');
                this.reloadPage();
              } else {
                this.notificationService.errorNotification('deliveryExecption.modal.damaged.notification.error');
              }
            }
          });
    }

    /**
     * @description A method to reload the page
     * @returns {void}
     */
    reloadPage() {
        // FIND A BETTER SOLUTION
        this.router.navigate([PartnerRoutes.dispatching.fullPath()]).then(() => {
            this.router.navigate([PartnerRoutes.dispatchingView.fullPath()], { queryParams: this.route.snapshot.queryParams });
        })
      }
  }