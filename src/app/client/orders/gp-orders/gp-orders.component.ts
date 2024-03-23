import { Component } from "@angular/core";
import { RequestTableElement } from "../../../core/layouts/orders/orders.component";
import { ItemsStatus, baseOrdersComponent } from "../base-orders.component";
import { ClientRoutes } from "../../client.route";

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
     * @description The orders on preparation
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly ordersOnPreparation$ = this.requestsService.getItemsOrdersForGp(this.userService.currentUserId).then(x => x.filter(y => y.status === ItemsStatus.WAITING_RECEPTION || y.status === ItemsStatus.AT_CHECKPOINT));

    /**
     * @description The orders ready for pickup
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly ordersReadyForPickup$ = this.requestsService.getItemsOrdersForGp(this.userService.currentUserId).then(x => x.filter(y => y.status === ItemsStatus.READY_TO_PICK_UP || y.status === ItemsStatus.WITH_GP));

    /**
     * @description The orders on delivery
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly ordersOnDelivery$ = this.requestsService.getItemsOrdersForGp(this.userService.currentUserId).then(x => x.filter(y => y.status === ItemsStatus.ON_DELIVERY));

    /**
     * @description The orders completed
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly orderCompleted$ = this.requestsService.getItemsOrdersForGp(this.userService.currentUserId).then(x => x.filter(y => y.status === ItemsStatus.DELIVERED || y.status === ItemsStatus.EXCEPTION));

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
          case ItemsStatus.WAITING_RECEPTION:
            return {
              label: 'moduleList.gp.orders.status.itemOnHisWay',
              icon: 'local_shipping',
              action: () => this.router.navigate([ClientRoutes.itemOnHisWay.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: row.deliveryDate,
              }})
            }
          case ItemsStatus.WAIT_ON_PAYMENT:
          case ItemsStatus.AT_CHECKPOINT:
            return {
              label: 'moduleList.gp.orders.status.itemAtCheckpoint',
              icon: 'location_on',
              action: () => this.router.navigate([ClientRoutes.itemAtCheckpoint.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: row.deliveryDate,
              }})
            }
          case ItemsStatus.READY_TO_PICK_UP:
            return {
              label: 'moduleList.gp.orders.status.readyForPickup',
              icon: 'concierge',
              action: () => this.router.navigate([ClientRoutes.readyForPickup.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: row.deliveryDate,
              }})
            }
          case ItemsStatus.WITH_GP:
            return {
              label: 'moduleList.gp.orders.status.itemWithYou',
              icon: 'approval_delegation',
              action: () => this.router.navigate([ClientRoutes.itemWithYou.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: row.deliveryDate,
              }})
            }
          case ItemsStatus.ON_DELIVERY:
            return {
              label: 'moduleList.client.orders.status.onDelivery',
              icon: 'flightsmode',
              action: () => console.log("wait on dispatch module")
            }
          case ItemsStatus.EXCEPTION:
            return {
              label: 'moduleList.client.orders.status.exception',
              icon: 'error',
              action: () => console.log("wait on dispatch module")
            }
          case ItemsStatus.DELIVERED:
            return {
              label: 'moduleList.client.orders.status.delivered',
              icon: 'done',
              action: () => this.router.navigate([ClientRoutes.itemDeliveredGp.fullPath()], { queryParams: {
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