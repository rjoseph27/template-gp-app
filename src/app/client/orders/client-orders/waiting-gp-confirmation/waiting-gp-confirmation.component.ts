import { Component } from "@angular/core";
import { ClientRoutes } from "../../../../client.route";
import { baseOrderDetailsComponent } from "../../base-order-details.component";

/**
 * @class ClientWaitingGpConfirmationComponent
 * @description The waiting for GP confirmation component
 */
@Component({
    selector: 'client-waiting-gp-confirmation',
    templateUrl: './waiting-gp-confirmation.component.html',
    styleUrls: ['./../../base-order-details.component.scss']
  })
  export class ClientWaitingGpConfirmationComponent extends baseOrderDetailsComponent {
    /**
    * @description Navigates to the my orders page
    * @returns {void}
    */
    protected navigateToMyOrders() {
        this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
    }

    /**
     * @description Cancels the order
     * @returns {Promise<void>}
     */
    protected  async cancelOrder(): Promise<void> {
        const currentOrder = this.route.snapshot.data['orderDetails'];
        const cancelRequest = {
          orderId: currentOrder.itemInformation.id,
          tripId: currentOrder.tripId,
          id: currentOrder.itemGroupId
        }
        this.modalService.openModal({
          title: "moduleList.gp.orders.confirmOrder.cancelModal.title",
          text: "moduleList.gp.orders.confirmOrder.cancelModal.content",
          confirmCaption: "moduleList.gp.orders.confirmOrder.cancelModal.acceptButton",
          cancelCaption: "moduleList.gp.orders.confirmOrder.cancelModal.rejectButton"
        }).then(async x => {
          if(x) {
            const isCanceledSucessfully = await this.requestsService.clientCancelOrder(cancelRequest);
            if(isCanceledSucessfully) {
              this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
              this.notificationService.successNotification('moduleList.client.orders.waitConfirmation.notification.success');
            } else {
              this.notificationService.errorNotification('moduleList.client.orders.waitConfirmation.notification.error');
            }
          }
        });
    }
  }