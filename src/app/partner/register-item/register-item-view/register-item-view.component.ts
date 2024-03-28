import { Component, OnInit, inject } from "@angular/core";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";
import { map, tap } from "rxjs/operators";
import { ModalService } from "../../../services/modal.service";
import { PartnerRoutes } from "../../partner.route";
import { PartnerRegisterItemService } from "../../service/register-item.service";
import { BehaviorSubject } from "rxjs";
import { NotificationService } from "../../../services/notification.service";

/**
 * @class PartnerRegisterItemViewComponent
 * @description The partner register item view component
 */
@Component({
    selector: 'partner-register-item-view',
    templateUrl: './register-item-view.component.html',
    styleUrls: ['./register-item-view.component.scss'],
    providers: [ModalService]
  })
  export class PartnerRegisterItemViewComponent extends BaseOrderDetailsComponent implements OnInit {
    /**
     * @description The register item service
     * @type {PartnerRegisterItemService}
     */
    private readonly registerItemService = inject(PartnerRegisterItemService);

    /**
     * @description The backing field for cancel loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _cancelLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description The cancel loading
     * @type {Observable<boolean>}
     */
    protected readonly cancelLoading$ = this._cancelLoading$.asObservable();

    /**
     * @description The backing field for confirm loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _confirmLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description The confirm loading
     * @type {Observable<boolean>}
     */
    protected readonly confirmLoading$ = this._confirmLoading$.asObservable();

    /**
     * @description A method to go to the edit page
     * @returns {void}
     */
    protected goToEditPage(): void {
      this.router.navigate([PartnerRoutes.registerItemEdit.fullPath()])
    }

    /** @inheritdoc */
    ngOnInit(): void {
      this.orderDetail$.pipe(
        tap(orderDetails => this.registerItemService.currentOrderDetails = orderDetails))
      .subscribe();
    }

    /**
     * @description A method to cancel the order
     * @returns {void}
     */
    protected cancelOrder(): void {
      this.modalService.openModal({
        title: "moduleList.registerItem.cancelOrder.modal.title",
        text: "moduleList.registerItem.cancelOrder.modal.content",
        confirmCaption: "moduleList.registerItem.cancelOrder.modal.confirm",
        cancelCaption: "moduleList.registerItem.cancelOrder.modal.cancel"
      }).then(async x => {
        if(x)
        {
          const orderDetails = this.registerItemService.currentOrderDetails
          this._cancelLoading$.next(true);
          this.requestsService.partnerCancelOrder({
            id: orderDetails.itemGroupId, 
            tripId: orderDetails.tripId, 
            orderId: orderDetails.itemInformation.id.toString()
          }).then(() => {
            if(x) {
              this._cancelLoading$.next(false);
              this.router.navigate([PartnerRoutes.registerItem.fullPath()]);
              this.notificationService.successNotification('moduleList.registerItem.cancelOrder.modal.notification.success');
            } else {
              this.notificationService.errorNotification('moduleList.registerItem.cancelOrder.modal.notification.error');
            }
          });
        }
      })
    }

    /**
     * @description A method to confirm the order
     * @returns {void}
     */
    protected confirmOrder(): void {
      this.modalService.openModal({
        title: "moduleList.registerItem.confirmOrder.modal.title",
        text: "moduleList.registerItem.confirmOrder.modal.content",
        confirmCaption: "moduleList.registerItem.confirmOrder.modal.confirm",
        cancelCaption: "moduleList.registerItem.confirmOrder.modal.cancel"
      }).then(async x => {
        if(x)
        {
          const orderDetails = this.registerItemService.currentOrderDetails
          this._confirmLoading$.next(true);
          this.requestsService.orderWaitOnPayment({
            id: orderDetails.itemGroupId, 
            tripId: orderDetails.tripId, 
            orderId: orderDetails.itemInformation.id.toString()
          }).then(() => {
            if(x) {
              this._confirmLoading$.next(false);
              this.notificationService.successNotification('moduleList.registerItem.confirmOrder.modal.notification.success');
              this.router.navigate([PartnerRoutes.registerItem.fullPath()]);
            } else {
              this.notificationService.errorNotification('moduleList.registerItem.confirmOrder.modal.notification.error');
            }
          });
        }
      })
    }
  }