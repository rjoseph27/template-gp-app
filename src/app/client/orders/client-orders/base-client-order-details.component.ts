import { ClientRoutes } from "../../client.route";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";

/**
 * @class BaseClientOrderDetailsComponent
 * @description The base client order details component
 */
export abstract class BaseClientOrderDetailsComponent extends BaseOrderDetailsComponent {
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