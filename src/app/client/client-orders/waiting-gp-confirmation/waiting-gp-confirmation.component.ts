import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ClientRoutes } from "../../../client.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { ClientRequestsService } from "../../service/requests.service";
import { NotificationService } from "../../../services/notification.service";

/**
 * @class ClientWaitingGpConfirmationComponent
 * @description The waiting for GP confirmation component
 */
@Component({
    selector: 'client-waiting-gp-confirmation',
    templateUrl: './waiting-gp-confirmation.component.html',
    styleUrls: ['./waiting-gp-confirmation.component.scss']
  })
  export class ClientWaitingGpConfirmationComponent {
    /**
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    private readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description An observable for the order details
     * @type {Observable<OrderDetails>}
     */
    protected readonly orderDetail$ = this.route.data.pipe(map(data => data['orderDetails']));

    /**
     * @description The angular router service.
     * @type {Router}
     */
    protected readonly router: Router = inject(Router);

    /**
    * @description The country of the user
    * @type {string}
    */
    protected readonly userCountry = this.route.snapshot.data['userInfo'].country;

    /**
    * @description The currency of the user
    * @type {string}
    */
    protected readonly userCurrency = COUNTRY_INFO_LIST.find(x => x.name === this.userCountry).currency;

    /**
   * @description The notification service
   * @type {NotificationService}
   */
  private readonly notificationService: NotificationService = inject(NotificationService);

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

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
        const isCanceledSucessfully = await this.requestsService.clientCancelOrder(cancelRequest);
        if(isCanceledSucessfully) {
            this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
            this.notificationService.successNotification('moduleList.client.orders.waitConfirmation.notification.success');
        } else {
          this.notificationService.errorNotification('moduleList.client.orders.waitConfirmation.notification.error');
        }
    }
  }