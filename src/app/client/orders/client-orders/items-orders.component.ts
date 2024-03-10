import { Component, inject } from '@angular/core';
import { ClientRoutes } from '../../../client.route';
import { RequestTableElement } from '../../../core/layouts/orders/orders.component';
import { ItemsStatus, baseOrdersComponent } from '../base-orders.component';

/**
 * @class ClientItemsOrdersComponent
 * @description The client items orders component
 */
@Component({
    selector: 'client-items-orders',
    templateUrl: './items-orders.component.html',
    styleUrls: ['../base-order.component.scss']
  })
  export class ClientItemsOrdersComponent extends baseOrdersComponent {
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