import { Component } from "@angular/core";
import { RequestTableElement } from "../../../core/layouts/orders/orders.component";
import { ItemsStatus, baseOrdersComponent } from "../base-orders.component";
import { ClientRoutes } from "../../../client.route";

/**
 * @class ClientGpOrdersComponent
 * @description The component for the gp orders
 */
@Component({
    selector: 'client-gp-orders',
    templateUrl: './gp-orders.component.html',
    styleUrls: ['../base-order.component.scss']
  })
  export class ClientGpOrdersComponent extends baseOrdersComponent {
    /**
     * @description The items orders
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly newOrders$ = this.requestsService.getItemsOrdersForGp(this.userService.currentUserId).then(x => x.filter(y => y.status === ItemsStatus.WAIT_CONFIRMATION));

    /**
     * @description The items orders
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly getStatusInfo = (row: RequestTableElement) => {
        switch (row.status) {
          case ItemsStatus.WAIT_CONFIRMATION:
            return {
              label: 'moduleList.gp.orders.status.confirmOrder',
              icon: 'check_circle',
              action: () => this.router.navigate([ClientRoutes.confirmOrders.fullPath()], { queryParams: {
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
  }