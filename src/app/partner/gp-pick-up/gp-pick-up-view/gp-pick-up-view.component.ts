import { Component } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";
import { PartnerRoutes } from "../../partner.route";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

/**
 * @class PartnerGpPickUpViewComponent
 * @description The partner GP pick up view component
 */
@Component({
    selector: 'partner-gp-pick-up-view',
    templateUrl: './gp-pick-up-view.component.html',
    styleUrls: ['./gp-pick-up-view.component.scss'],
    providers: [ModalService]
  })
  export class PartnerGpPickUpViewComponent extends BaseOrderDetailsComponent {
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
     * @description The backing field for change GP loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _changeGpLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description The change GP loading
     * @type {Observable<boolean>}
     */
    protected readonly changeGpLoading$ = this._cancelLoading$.asObservable();

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
            const orderDetails = this.route.snapshot.data['orderDetails'];
            this._confirmLoading$.next(true);
            this.requestsService.orderWithGp({
              id: orderDetails.itemGroupId, 
              tripId: orderDetails.tripId, 
              orderId: orderDetails.itemInformation.id.toString()
            }).then(() => {
              if(x) {
                this._confirmLoading$.next(false);
                this.notificationService.successNotification('moduleList.registerItem.confirmOrder.modal.notification.success');
                this.router.navigate([PartnerRoutes.gpPickUp.fullPath()]);
              } else {
                this.notificationService.errorNotification('moduleList.registerItem.confirmOrder.modal.notification.error');
              }
            });
          }
        })
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
          const orderDetails = this.route.snapshot.data['orderDetails'];
          this._cancelLoading$.next(true);
          this.requestsService.partnerCancelOrder({
            id: orderDetails.itemGroupId, 
            tripId: orderDetails.tripId, 
            orderId: orderDetails.itemInformation.id.toString()
          }).then(() => {
            if(x) {
              this._cancelLoading$.next(false);
              this.notificationService.successNotification('moduleList.registerItem.cancelOrder.modal.notification.success');
              this.router.navigate([PartnerRoutes.gpPickUp.fullPath()]);
            } else {
              this.notificationService.errorNotification('moduleList.registerItem.cancelOrder.modal.notification.error');
            }
          });
        }
      })
    }

    /**
     * @description A method to change GP
     * @returns {void}
     */
    protected changeGp(): void {
        this._changeGpLoading$.next(true);
        this.modalService.openModal({
            title: "moduleList.gpPickUp.view.changeGpModal.title",
            text: "moduleList.gpPickUp.view.changeGpModal.content",
            confirmCaption: "moduleList.gpPickUp.view.changeGpModal.acceptButton",
            cancelCaption: "moduleList.gpPickUp.view.changeGpModal.rejectButton"
          }).then(async x => {
            const currentOrder = this.route.snapshot.data['orderDetails'];
            const cancelRequest = {
                orderId: currentOrder.itemInformation.id,
                tripId: currentOrder.tripId,
                id: currentOrder.itemGroupId
            }
            if(x) {
                const isCanceledSucessfully = await this.requestsService.gpCancelOrder(cancelRequest);
                this._changeGpLoading$.next(false);
                if(isCanceledSucessfully) {
                    this.router.navigate([PartnerRoutes.gpPickUp.fullPath()]);
                    this.notificationService.successNotification('moduleList.gpPickUp.view.changeGpModal.notification.success');
                } else {
                    this.notificationService.errorNotification('moduleList.gpPickUp.view.changeGpModal.notification.error');
                }
            }
          });
    }
  }