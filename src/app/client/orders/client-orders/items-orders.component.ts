import { Component, inject } from '@angular/core';
import { ClientRoutes } from '../../client.route';
import { RequestTableElement } from '../../../core/layouts/orders/orders.component';
import { ItemsStatus, baseOrdersComponent } from '../base-orders.component';
import { ClientSendItemsService } from '../../service/send-items.service';
import { LoadingService } from '../../../services/loading.service';
import { GhDate } from '../../../misc/classes/gh-date';

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
    protected readonly getItemsOrders$ = this.requestsService.getItemsOrders(this.userService.currentUserId).then(x => x.filter(y => y.status !== ItemsStatus.DELIVERED && y.status !== ItemsStatus.EXCEPTION));

    /**
     * @description The delivered items orders
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly getDeliveredOrders$ = this.requestsService.getItemsOrders(this.userService.currentUserId).then(x => x.filter(y => y.status === ItemsStatus.DELIVERED || y.status === ItemsStatus.FINALIZED || y.status === ItemsStatus.EXCEPTION));

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
              deliveryDate: new GhDate(row.deliveryDate).toISOString(),
            }})
          }
        case ItemsStatus.WAITING_RECEPTION:
          return {
            label: 'moduleList.client.orders.status.waitReception',
            icon: 'quick_reorder',
            action: () => this.router.navigate([ClientRoutes.waitingReception.fullPath()], { queryParams: {
              id: row.id,
              status: row.status,
              from: row.route.from,
              to: row.route.to,
              deliveryDate: new GhDate(row.deliveryDate).toISOString(),
            }})
          }
        case ItemsStatus.CANCELED_BY_GP:
          return {
            label: 'moduleList.client.orders.status.canceledByGp',
            icon: 'calendar_month',
            action: async () => this.router.navigate([ClientRoutes.rescheduleOrder.fullPath()], { queryParams: {
              id: row.id,
              status: row.status,
              from: row.route.from,
              to: row.route.to,
              deliveryDate: new GhDate(row.deliveryDate).toISOString(),
            }})
            }
          case ItemsStatus.WAIT_ON_PAYMENT:
          case ItemsStatus.AT_CHECKPOINT:
          case ItemsStatus.READY_TO_PICK_UP:
            return {
              label: 'moduleList.client.orders.status.atCheckpoint',
              icon: 'location_on',
              action: () => this.router.navigate([ClientRoutes.tracking.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: new GhDate(row.deliveryDate).toISOString(),
              }})
            }
          case ItemsStatus.REDIRECT:
              return {
                label: 'moduleList.client.orders.status.redirect',
                icon: 'local_shipping',
                action: () => this.router.navigate([ClientRoutes.tracking.fullPath()], { queryParams: {
                  id: row.id,
                  status: row.status,
                  from: row.route.from,
                  to: row.route.to,
                  deliveryDate: new GhDate(row.deliveryDate).toISOString(),
                }})
              }
          case ItemsStatus.WITH_GP:
            return {
              label: 'moduleList.client.orders.status.withGp',
              icon: 'assignment_ind',
              action: () => this.router.navigate([ClientRoutes.tracking.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: new GhDate(row.deliveryDate).toISOString(),
              }})
            }
          case ItemsStatus.ON_DELIVERY:
            return {
              label: 'moduleList.client.orders.status.onDelivery',
              icon: 'flightsmode',
              action: () => this.router.navigate([ClientRoutes.tracking.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: new GhDate(row.deliveryDate).toISOString(),
              }})
            }
          case ItemsStatus.FINAL_CHECKPOINT:
            return {
              label: 'moduleList.client.orders.status.finalCheckpoint',
              icon: 'location_on',
              action: () => this.router.navigate([ClientRoutes.itemReadyForPickup.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: new GhDate(row.deliveryDate).toISOString(),
              }})
            }
          case ItemsStatus.FINALIZED:
          case ItemsStatus.DELIVERED:
            return {
              label: 'moduleList.client.orders.status.delivered',
              icon: 'done',
              action: () => this.router.navigate([ClientRoutes.itemDelivered.fullPath()], { queryParams: {
                id: row.id,
                status: row.status,
                from: row.route.from,
                to: row.route.to,
                deliveryDate: new GhDate(row.deliveryDate).toISOString(),
              }})
            }
        case ItemsStatus.EXCEPTION:
          return {
            label: 'moduleList.client.orders.status.exception',
            icon: 'error',
            action: () => this.router.navigate([ClientRoutes.tracking.fullPath()], { queryParams: {
              id: row.id,
              status: row.status,
              from: row.route.from,
              to: row.route.to,
              deliveryDate: new GhDate(row.deliveryDate).toISOString(),
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