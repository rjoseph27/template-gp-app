import { Component } from "@angular/core";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";
import { map } from "rxjs/operators";
import { ModalService } from "../../../services/modal.service";
import { PartnerRoutes } from "../../partner.route";
import { BehaviorSubject } from "rxjs";

/**
 * @class PartnerBillingViewComponent
 * @description The partner billing view component
 */
@Component({
    selector: 'partner-billing-view',
    templateUrl: './billing-view.component.html',
    styleUrls: ['./billing-view.component.scss'],
    providers: [ModalService]
  })
  export class PartnerBillingViewComponent extends BaseOrderDetailsComponent {
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
              this.router.navigate([PartnerRoutes.billing.fullPath()]);
            } else {
              this.notificationService.errorNotification('moduleList.registerItem.cancelOrder.modal.notification.error');
            }
          });
        }
      })
    }
  }