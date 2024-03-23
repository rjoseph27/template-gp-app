import { ClientRoutes } from "../../client.route";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";

/**
 * @class BaseGpOrderDetailsComponent
 * @description The base GP order details component
 */
export class BaseGpOrderDetailsComponent extends BaseOrderDetailsComponent {
    /**
    * @description Navigates to the my orders page
    * @returns {void}
    */
    protected navigateToMyOrders() {
        this.router.navigate([ClientRoutes.gpOrders.fullPath()]);
    }

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
  }