import { Component } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";
import { CarrierRoutes } from "../../../carrier.route";

/**
 * @class CarrierConfirmOrdersComponent
 * @description The confirm orders component
 */
@Component({
    selector: 'carrier-confirm-orders',
    templateUrl: './confirm-orders.component.html',
    styleUrls: ['./../../base-order-details.component.scss', './confirm-orders.component.scss'],
    providers: [ModalService]
  })
  export class CarrierConfirmOrdersComponent extends BaseGpOrderDetailsComponent {
    /**
     * @description A method that accept the order
     * @returns {Promise<void>}
     */
    protected async acceptOrder(): Promise<void> {
        const currentOrder = this.route.snapshot.data['orderDetails'];
        const cancelRequest = {
            orderId: currentOrder.itemInformation.id,
            tripId: currentOrder.tripId,
            id: currentOrder.itemGroupId
        }
        const isAcceptedSuccessfully = await this.requestsService.gpAcceptOrder(cancelRequest);
        if(isAcceptedSuccessfully) {
            this.router.navigate([CarrierRoutes.gpOrders.fullPath()]);
            this.notificationService.successNotification('moduleList.gp.orders.confirmOrder.acceptNotification.success');
        } else {
            this.notificationService.errorNotification('moduleList.gp.orders.confirmOrder.acceptNotification.error');
        }
    }
  }