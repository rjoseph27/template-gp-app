import { Component } from "@angular/core";
import { BaseOrderDetailsComponent } from "../../../../misc/base-class/base-order-details.component";
import { ModalService } from "../../../../services/modal.service";
import { ClientRoutes } from "../../../../client.route";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";

/**
 * @class ClientConfirmOrdersComponent
 * @description The confirm orders component
 */
@Component({
    selector: 'client-confirm-orders',
    templateUrl: './confirm-orders.component.html',
    styleUrls: ['./../../base-order-details.component.scss', './confirm-orders.component.scss'],
    providers: [ModalService]
  })
  export class ClientConfirmOrdersComponent extends BaseGpOrderDetailsComponent {
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
            this.router.navigate([ClientRoutes.gpOrders.fullPath()]);
            this.notificationService.successNotification('moduleList.gp.orders.confirmOrder.acceptNotification.success');
        } else {
            this.notificationService.errorNotification('moduleList.gp.orders.confirmOrder.acceptNotification.error');
        }
    }
  }