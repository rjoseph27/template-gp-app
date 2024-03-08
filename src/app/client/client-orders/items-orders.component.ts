import { Component, inject } from '@angular/core';
import { ClientRequestsService } from '../service/requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ClientRoutes } from '../../client.route';
import { RequestTableElement } from '../../core/layouts/orders/orders.component';
import { map } from 'rxjs/operators';

/**
 * @enum ItemsStatus
 * @description The items status
 */
export enum ItemsStatus {
  /**
   * @description The items are waiting for confirmation of the GP
   * @type {string}
   */
  WAIT_CONFIRMATION = 'WAIT_CONFIRMATION',

  /**
   * @description The items are on a alert to find a GP
   * @type {string}
   */
  ON_ALERT = 'ON_ALERT',

  /**
   * @description The items has been rejected by the GP
   * @type {string}
   */
  SELECT_NEW_TRIP = 'SELECT_NEW_TRIP',

  /**
   * @description The items has been canceled by the team
   * @type {string}
   */
  CANCEL = 'CANCEL',

  /**
   * @description The clients need to send the items to the checkpoint
   * @type {string}
   */
  WAITING_RECEPTION = 'WAITING_RECEPTION',

  /**
   * @description The items are at the checkpoint
   * @type {string}
   */
  AT_CHECKPOINT = 'AT_CHECKPOINT',

  /**
   * @description The items are on the way to the final destination
   * @type {string}
   */
  ON_DELIVERY = 'ON_DELIVERY',

  /**
   * @description The items had an exception during the delivery
   * @type {string}
   */
  EXCEPTION = 'EXCEPTION',

  /**
   * @description The items are at the final destination
   * @type {string}
   */
  FINAL_DESTINATION = 'FINAL_DESTINATION',

  /**
   * @description The items has been delivered
   * @type {string}
   */
  DELIVERED = 'DELIVERED',
}

/**
 * @class ClientItemsOrdersComponent
 * @description The client items orders component
 */
@Component({
    selector: 'client-items-orders',
    templateUrl: './items-orders.component.html',
    styleUrls: ['./items-orders.component.scss']
  })
  export class ClientItemsOrdersComponent {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The users service
    * @type {UsersService}
    */
    private readonly userService: UsersService = inject(UsersService);

    /**
     * @description The items orders
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly getItemsOrders$ = this.requestsService.getItemsOrders(this.userService.currentUserId);

    /**
     * @description The delivered items orders
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly getDeliveredOrders$ = this.requestsService.getItemsOrders(this.userService.currentUserId).then(x => x.filter(y => y.status === ItemsStatus.DELIVERED));

   /**
   * @description The angular router service.
   * @type {Router}
   */
   private readonly router: Router = inject(Router);

    /**
     * @description The items orders
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly getStatusInfo = (row: RequestTableElement) => {
      switch (row.status) {
        case ItemsStatus.WAIT_CONFIRMATION:
          return {
            label: 'moduleList.client.orders.status.waitConfirmation',
            icon: 'pending',
            action: () => this.router.navigate([ClientRoutes.waitingGpConfirmation.fullPath()], { queryParams: {
              id: row.id,
              status: row.status,
              from: row.route.from,
              to: row.route.to,
              deliveryDate: row.deliveryDate,
            }})
          }
        default:
          return undefined;
      }
    }

    /**
     * @description A function to go to the send items page
     * @returns {void}
     */
    protected goSendItemsPage() {
      this.router.navigate([ClientRoutes.sendItems.fullPath()]);
    }
  }