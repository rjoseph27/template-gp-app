import { Component } from "@angular/core";
import { baseOrderDetailsComponent } from "../../base-order-details.component";
import { ModalService } from "../../../../services/modal.service";
import { ClientRoutes } from "../../../../client.route";

/**
 * @class ClientConfirmOrdersComponent
 * @description The confirm orders component
 */
@Component({
    selector: 'client-confirm-orders',
    templateUrl: './confirm-orders.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientConfirmOrdersComponent extends baseOrderDetailsComponent {
    /**
     * @description A method that cancel the order
     * @returns {void}
     */
    protected cancelOrder(): void {
        this.modalService.openModal({
            title: "moduleList.gp.orders.confirmOrder.cancelModal.title",
            text: "moduleList.gp.orders.confirmOrder.cancelModal.content",
            confirmCaption: "moduleList.gp.orders.confirmOrder.cancelModal.acceptButton",
            cancelCaption: "moduleList.gp.orders.confirmOrder.cancelModal.rejectButton"
          }).then(async x => {
            const currentOrder = this.route.snapshot.data['orderDetails'];
            const cancelRequest = {
                orderId: currentOrder.itemInformation.id,
                tripId: currentOrder.tripId,
                id: currentOrder.itemGroupId
            }
            if(x) {
                const isCanceledSucessfully = await this.requestsService.gpCancelOrder(cancelRequest);
                if(isCanceledSucessfully) {
                    this.router.navigate([ClientRoutes.gpOrders.fullPath()]);
                    this.notificationService.successNotification('moduleList.gp.orders.confirmOrder.cancelNotification.success');
                } else {
                    this.notificationService.errorNotification('moduleList.gp.orders.confirmOrder.cancelNotification.error');
                }
            }
          });
    }

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