import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { DeliveryExceptionType, TrackingPoint, TrackingPointType } from "./tracking.type";
import { BaseTrackingComponent } from "./base-tracking.component";
import { SelectFieldOption } from "../../elements/input/select-field/select-field.component";
import { BehaviorSubject } from "rxjs";
import { ModalService } from "../../../services/modal.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../services/notification.service";

/**
 * @class GhTrackingComponent
 * @description The tracking component
 */
@Component({
    selector: 'gh-tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.scss']
  })
  export class GhTrackingComponent extends BaseTrackingComponent {
    @Input() orderList: SelectFieldOption[]

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
    * @description The notification service
    * @type {NotificationService}
    */
    private readonly notificationService: NotificationService = inject(NotificationService);


    /**
    * @description The modal service
    * @type {ModalService}
    */
    private readonly modalService: ModalService = inject(ModalService);

    /**
     * @description The tracking point type
     * @type {TrackingPointType}
     */
    protected readonly trackingPointType = TrackingPointType;

    /**
     * @description The backing field for the selected order id
     * @type {BehaviorSubject<string>}
     */
    private readonly _selectedOrderId$ = new BehaviorSubject<string>(null)

    /**
     * @description An observable for the selected order id
     * @type {Observable<string>}
     */
    protected readonly selectedOrderId$ = this._selectedOrderId$.asObservable();

    /**
     * @description An event emitter when an action is performed to reload the page
     * @type {EventEmitter<void>}
     */
    @Output() reloadPage = new EventEmitter<void>();

    /**
     * @description The backing field for the current point
     * @type {BehaviorSubject<TrackingPoint>}
     */
    private readonly _currentPoint$ = new BehaviorSubject<TrackingPoint>(undefined);

    /**
     * @description The current point
     * @type {TrackingPoint}
     */
    protected get currentPoint() {
      return this._currentPoint$.value;
    }

    /**
     * @description A boolean that indicates if the user can see the view for the gp.
     * @type {boolean}
     */
    @Input() gpView: boolean = false;

    /**
     * @description The selected order id
     * @type {string}
     */
    protected set selectedOrderId(value: string) {
        this._selectedOrderId$.next(value === '*' ? null : value)
        this.orderId = this._selectedOrderId$.value;
        const history = [...this.history];
        this._currentPoint$.next(history.reverse().find(x => x.orderId === this.orderId))
        this.orderIdChange.emit(this.selectedOrderId)
    }
    protected get selectedOrderId() {
        return this._selectedOrderId$.value
    }

    /**
     * @description The function to add a history
     * @type {(args: TrackingPoint) => Promise<boolean>}
     */
    @Input() addHistoryResolver: (args: TrackingPoint) => Promise<boolean>

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
            const addHistorySuccessfully = await this.addHistoryResolver({
                  type: this._currentPoint$.value.type,
                  location: this._currentPoint$.value.location,
                  orderId: this.selectedOrderId,
                  exception: DeliveryExceptionType.LOST,
              });
            this._lostOrderButtonLoading$.next(false);
            if(addHistorySuccessfully) {
              this.notificationService.successNotification('deliveryExecption.modal.lostOrder.notification.success');
              this.reloadPage.emit();
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
            const addHistorySuccessfully = await this.addHistoryResolver({
                  type: this._currentPoint$.value.type,
                  location: this._currentPoint$.value.location,
                  orderId: this.selectedOrderId,
                  exception: DeliveryExceptionType.ITEM_DAMAGED,
              });
            this._damagedOrderButtonLoading$.next(false);
            if(addHistorySuccessfully) {
              this.notificationService.successNotification('deliveryExecption.modal.damaged.notification.success');
              this.reloadPage.emit();
            } else {
              this.notificationService.errorNotification('deliveryExecption.modal.damaged.notification.error');
            }
          }
        });
    }
  }