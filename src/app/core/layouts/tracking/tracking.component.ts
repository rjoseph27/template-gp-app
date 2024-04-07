import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { DeliveryExceptionType, TrackingPoint, TrackingPointType } from "./tracking.type";
import { BaseTrackingComponent } from "./base-tracking.component";
import { SelectFieldOption } from "../../elements/input/select-field/select-field.component";
import { BehaviorSubject } from "rxjs";
import { ModalService } from "../../../services/modal.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../../services/notification.service";
import { TaskName, Tasks } from "../../../misc/base-class/base-get-tasks.resolver";
import { GhDate } from "../../../misc/classes/gh-date";

/**
 * @class GhTrackingComponent
 * @description The tracking component
 */
@Component({
    selector: 'gh-tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.scss']
  })
  export class GhTrackingComponent extends BaseTrackingComponent implements OnInit {
    /**
     * @description The list of orders in the select field
     * @type {SelectFieldOption[]}
     */
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
     * @description The backing field for the on his way button loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _onHisWayButtonLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the on his way button loading
     * @type {Observable<boolean>}
     */
    protected readonly onHisWayButtonLoading$ = this._onHisWayButtonLoading$.asObservable();

    /**
     * @description The backing field for the first departure button loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _firstDepartureButtonLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the first departure button loading
     * @type {Observable<boolean>}
     */
    protected readonly firstDepartureButtonLoading$ = this._firstDepartureButtonLoading$.asObservable();

    /**
     * @description The backing field for the last arrival button loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _lastArrivalButtonLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the last arrival button loading
     * @type {Observable<boolean>}
     */
    protected readonly lastArrivalButtonLoading$ = this._lastArrivalButtonLoading$.asObservable();

    /**
     * @description The backing field for the cancel trip button loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _cancelTripButtonLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the cancel trip button loading
     * @type {Observable<boolean>}
     */
    protected readonly cancelTripButtonLoading$ = this._cancelTripButtonLoading$.asObservable();

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
     * @description An event emitter to declare when the declare delay button has been clicked
     * @type {EventEmitter<string>}
     */
    @Output() declareDelay = new EventEmitter<void>();

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
     * @description A boolean that indicates if the user is in client mode
     * @type {boolean}
     */
    @Input() clientMode: boolean = false;

    /**
     * @description The selected order id
     * @type {string}
     */
    protected set selectedOrderId(value: string) {
      this._selectedOrderId$.next(value === '*' ? null : value)
      this.orderId = this._selectedOrderId$.value;
      const history = [...this.history];
      this._currentPoint$.next(history.reverse().find(x => x.orderId === this.orderId || x.orderId === null))
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
     * @description The currents tasks of the GP
     * @type {Tasks[]}
     */
    @Input() tasks: Tasks[] = []

    /** @inheritdoc */
    ngOnInit(): void {
      this.selectedOrderId = this.orderId
    }

    /**
     * @description A boolean that indicates if the user can see the button when the order is with the GP
     * @type {boolean}
     */
    protected get withGpButton(): boolean {
        const task = this.tasks.find(x => x.name === TaskName.NOTICE_GP_TO_BE_ON_WAY_TO_AIRPORT);
        const dateNotPassed = task ? (new Date()).getTime() >= (new GhDate(task.date)).getDate().getTime() : true;
        const taskDone = this.history.find(x => x.type === TrackingPointType.ON_WAY_TO_AIRPORT);
        return dateNotPassed && !taskDone && !!this.history.find(x => x.type === TrackingPointType.WITH_GP);
    }

    /**
     * @description A boolean that indicates if the user can see the button when the GP is ready to board plane
     * @type {boolean}
     */
    protected get firstDepartureButton(): boolean {
      const task = this.tasks.find(x => x.name === TaskName.NOTICE_GP_TO_BE_FIRST_DEPARTURE);
      const dateNotPassed = task ? (new Date()).getTime() >= (new GhDate(task.date)).getDate().getTime() : true;
      const taskDone = this.history.find(x => x.type === TrackingPointType.FIRST_DEPARTURE);
      return dateNotPassed && !taskDone &&  !!this.history.find(x => x.type === TrackingPointType.ON_WAY_TO_AIRPORT);
   }

   /**
    * @description A boolean that indicates if the user can see the button when the GP arrived at the final country
    * @type {boolean}
    */
   protected get lastArrivalButton(): boolean {
    const task = this.tasks.find(x => x.name === TaskName.NOTICE_GP_TO_BE_LAST_ARRIVAL);
    const dateNotPassed = task ? (new Date()).getTime() >= (new GhDate(task.date)).getDate().getTime() : true;
    const taskDone = this.history.find(x => x.type === TrackingPointType.LAST_ARRIVAL);
    return dateNotPassed && !taskDone &&  !!this.history.find(x => x.type === TrackingPointType.FIRST_DEPARTURE);
 }

    /**
     * @description A boolean that indicates if the user can see the button when the gp is on his way to the airport
     * @type {boolean}
     */
    protected get onWayAirportButton(): boolean {
      const task = this.tasks.find(x => x.name === TaskName.NOTICE_GP_TO_BE_FIRST_DEPARTURE);
        const dateNotPassed = task ? (new Date()).getTime() >= (new GhDate(task.date)).getDate().getTime() : true;
        const taskDone = this.history.find(x => x.type === TrackingPointType.FIRST_DEPARTURE);
        return dateNotPassed && !taskDone && !!this.history.find(x => x.type === TrackingPointType.ON_WAY_TO_AIRPORT);
    }

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
   * @description A method to generate a cancel trip exception
   * @returns {void}
   */
  protected async cancelTripException(): Promise<void> {
    this.modalService.openModal({
        title: "deliveryExecption.modal.cancelTrip.title",
        text: "deliveryExecption.modal.cancelTrip.content",
        confirmCaption: "deliveryExecption.modal.button.confirm",
        cancelCaption: "deliveryExecption.modal.button.cancel"
      }).then(async x => {
        if(x) {
          this._cancelTripButtonLoading$.next(true);
          const addHistorySuccessfully = await this.addHistoryResolver({
              type: this._currentPoint$.value.type === TrackingPointType.TRIP_CREATION ? TrackingPointType.AT_CHECKPOINT : this._currentPoint$.value.type,
              location: this._currentPoint$.value.location,
              orderId: this.selectedOrderId,
              exception: DeliveryExceptionType.TRIP_CANCELED,
            });
          this._cancelTripButtonLoading$.next(false);
          if(addHistorySuccessfully) {
            this.notificationService.successNotification('deliveryExecption.modal.cancelTrip.notification.success');
            this.reloadPage.emit();
          } else {
            this.notificationService.errorNotification('deliveryExecption.modal.cancelTrip.notification.error');
          }
        }
      });
  }

  /**
   * @description A method to generate an on his way exception
   * @returns {void}
   */
  protected async onHisWayException(): Promise<void> {
    this.modalService.openModal({
        title: "deliveryExecption.modal.onHisWay.title",
        text: "deliveryExecption.modal.onHisWay.content",
        confirmCaption: "deliveryExecption.modal.button.confirm",
        cancelCaption: "deliveryExecption.modal.button.cancel"
      }).then(async x => {
        if(x) {
          this._onHisWayButtonLoading$.next(true);
          const addHistorySuccessfully = await this.addHistoryResolver({
                type: TrackingPointType.ON_WAY_TO_AIRPORT,
                location: this.originCity,
                orderId: null,
                exception: null,
            });
          this._onHisWayButtonLoading$.next(false);
          if(addHistorySuccessfully) {
            this.notificationService.successNotification('deliveryExecption.modal.onHisWay.notification.success');
            this.reloadPage.emit();
          } else {
            this.notificationService.errorNotification('deliveryExecption.modal.onHisWay.notification.error');
          }
        }
      });
  }

  /**
   * @description A method to generate a first departure exception
   * @returns {void}
   */
  protected async firstDepartureException(): Promise<void> {
    this.modalService.openModal({
        title: "deliveryExecption.modal.firstDeparture.title",
        text: "deliveryExecption.modal.firstDeparture.content",
        confirmCaption: "deliveryExecption.modal.button.confirm",
        cancelCaption: "deliveryExecption.modal.button.cancel"
      }).then(async x => {
        if(x) {
          this._firstDepartureButtonLoading$.next(true);
          const addHistorySuccessfully = await this.addHistoryResolver({
                type: TrackingPointType.FIRST_DEPARTURE,
                location: this.originCity,
                orderId: null,
                exception: null,
            });
          this._firstDepartureButtonLoading$.next(false);
          if(addHistorySuccessfully) {
            this.notificationService.successNotification('deliveryExecption.modal.firstDeparture.notification.success');
            this.reloadPage.emit();
          } else {
            this.notificationService.errorNotification('deliveryExecption.modal.firstDeparture.notification.error');
          }
        }
      });
  }

  /**
   * @description A method to generate a last arrival exception
   * @returns {void}
   */
  protected async lastArrivalException(): Promise<void> {
    this.modalService.openModal({
        title: "deliveryExecption.modal.lastArrival.title",
        text: "deliveryExecption.modal.lastArrival.content",
        confirmCaption: "deliveryExecption.modal.button.confirm",
        cancelCaption: "deliveryExecption.modal.button.cancel"
      }).then(async x => {
        if(x) {
          this._lastArrivalButtonLoading$.next(true);
          const addHistorySuccessfully = await this.addHistoryResolver({
                type: TrackingPointType.LAST_ARRIVAL,
                location: this.destinationCity,
                orderId: null,
                exception: null,
            });
          this._lastArrivalButtonLoading$.next(false);
          if(addHistorySuccessfully) {
            this.notificationService.successNotification('deliveryExecption.modal.lastArrival.notification.success');
            this.reloadPage.emit();
          } else {
            this.notificationService.errorNotification('deliveryExecption.modal.lastArrival.notification.error');
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