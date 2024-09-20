import { Component, inject } from "@angular/core";
import { ItemsStatus } from "../orders/base-orders.component";
import { ClientRoutes } from "../client.route";
import { GhDate } from "../../misc/classes/gh-date";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestTableElement } from "../../core/layouts/orders/orders.component";
import { count, map } from "rxjs/operators";
import { ClientApplicationService } from "../service/application.service";

@Component({
    selector: 'client-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
  export class ClientDashboardComponent {
    /**
     * @description The router
     * @type {Router}
     */
    private readonly router: Router = inject(Router);

    /**
     * @description The activated route service
     * @type {ActivatedRoute}
     */
    private readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description The client orders with the counts
     */
    protected readonly clientOrderResolver$ = this.route.data.pipe(
      map((data) => {
        const orders: RequestTableElement[] = data['clientOrders'];
        orders.forEach(order => {
          switch(order.status) {
            case ItemsStatus.WAIT_CONFIRMATION:
              this.clientOrderType[0].count++;
              break;
            case ItemsStatus.WAITING_RECEPTION:
              this.clientOrderType[1].count++;
              break;
            case ItemsStatus.CANCELED_BY_GP:
              this.clientOrderType[2].count++;
              break;
            case ItemsStatus.AT_CHECKPOINT:
            case ItemsStatus.WAIT_ON_PAYMENT:
            case ItemsStatus.READY_TO_PICK_UP:
              this.clientOrderType[3].count++;
              break;
            case ItemsStatus.ON_DELIVERY:
              this.clientOrderType[4].count++;
              break;
            case ItemsStatus.WITH_GP:
              this.clientOrderType[5].count++;
              break;
            case ItemsStatus.ON_DELIVERY:
              this.clientOrderType[6].count++;
              break;
            case ItemsStatus.FINAL_CHECKPOINT:
              this.clientOrderType[7].count++;
              break;
            case ItemsStatus.DELIVERED:
            case ItemsStatus.FINALIZED:
              this.clientOrderType[8].count++;
              break;
            case ItemsStatus.EXCEPTION:
              this.clientOrderType[9].count++;
              break;
          }
        })
        return this.clientOrderType;
    }));

    protected readonly gpOrderResolver$ = this.route.data.pipe(
      map((data) => {
        const orders: RequestTableElement[] = data['gpOrders'];
        orders.forEach(order => {
          switch(order.status) {
            case ItemsStatus.WAIT_CONFIRMATION:
              this.gpOrderType[0].count++;
              break;
            case ItemsStatus.WAITING_RECEPTION:
              this.gpOrderType[1].count++;
              break;
            case ItemsStatus.WAIT_ON_PAYMENT:
            case ItemsStatus.AT_CHECKPOINT:
              this.gpOrderType[2].count++;
              break;
            case ItemsStatus.READY_TO_PICK_UP:
              this.gpOrderType[3].count++;
              break;
            case ItemsStatus.WITH_GP:
              this.gpOrderType[4].count++;
              break;
            case ItemsStatus.ON_DELIVERY:
              this.gpOrderType[5].count++;
              break;
            case ItemsStatus.EXCEPTION:
              this.gpOrderType[6].count++;
              break;
            case ItemsStatus.DELIVERED:
            case ItemsStatus.FINALIZED:
              this.gpOrderType[7].count++;
              break;
          }  
        })
        return this.gpOrderType;
    }));

    /**
    * @description An observable for the user info
    * @type {Observable<string>}
    */
    private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']));

    /**
    * @description An observable for the user full name
    * @type {Observable<string>}
    */
    protected readonly userFullName$ = this.userInfo$.pipe(map(userInfo => userInfo.firstName + ' ' + userInfo.lastName));

    /**
    * @description The application service
    * @type {ClientApplicationService}
    */
    private readonly applicationService: ClientApplicationService = inject(ClientApplicationService);

    /**
     * @description The user mode
     * @type {Observable<UserType>}
     */
    protected readonly userMode$ = this.applicationService.userMode$;

    /**
     * @description The types of orders for the client
     */
    private readonly clientOrderType = [
      {
        name: ItemsStatus.WAIT_CONFIRMATION,
        label: 'moduleList.client.orders.status.waitConfirmation',
        icon: 'pending',
        count: 0,
        color: '#ff7700'
      }, 
      {
        name: ItemsStatus.WAITING_RECEPTION,
        label: 'moduleList.client.orders.status.waitReception',
        icon: 'quick_reorder',
        count: 0,
        color: '#40a832',
      },
      {
        name: ItemsStatus.CANCELED_BY_GP,
        label: 'moduleList.client.orders.status.canceledByGp',
        icon: 'calendar_month',
        count: 0,
        color: '#ff0000'
      }, 
      {
        name: ItemsStatus.AT_CHECKPOINT,
        label: 'moduleList.client.orders.status.atCheckpoint',
        icon: 'location_on',
        count: 0,
        color: '#0015ff'
      }, 
      {
        name: ItemsStatus.ON_DELIVERY,
        label: 'moduleList.client.orders.status.redirect',
        icon: 'local_shipping',
        count: 0,
        color: '#733b00'
      },
      {
        name: ItemsStatus.WITH_GP,
        label: 'moduleList.client.orders.status.withGp',
        icon: 'assignment_ind',
        count: 0, 
        color: '#ff7700'
      },
      {
        name: ItemsStatus.ON_DELIVERY,
        label: 'moduleList.client.orders.status.onDelivery',
        icon: 'flightsmode',
        count: 0,
        color: '#99007f'
      },
      {
        name: ItemsStatus.FINAL_CHECKPOINT,
        label: 'moduleList.client.orders.status.finalCheckpoint',
        icon: 'location_on',
        count: 0,
        color: '#ffe600',
      }, 
      {
        name: ItemsStatus.DELIVERED,
        label: 'moduleList.client.orders.status.delivered',
        icon: 'done',
        count: 0,
        color: '#40a832',
      }, 
      {
        name: ItemsStatus.EXCEPTION,
        label: 'moduleList.client.orders.status.exception',
        icon: 'error',
        count: 0,
        color: '#ff0000',
      }
    ]

    /**
     * @description The types of orders for the GP
     */
    private readonly gpOrderType = [{
      name: ItemsStatus.WAIT_CONFIRMATION,
      label: 'moduleList.gp.orders.status.confirmOrder',
      icon: 'check_circle',
      count: 0,
      color: '#40a832'
    }, {
      name: ItemsStatus.WAITING_RECEPTION,
      label: 'moduleList.gp.orders.status.itemOnHisWay',
      icon: 'local_shipping',
      count: 0,
      color: '#733b00'
    },
    {
      name: ItemsStatus.WAIT_ON_PAYMENT, //ItemsStatus.AT_CHECKPOINT
      label: 'moduleList.gp.orders.status.itemAtCheckpoint',
      icon: 'location_on',
      count: 0,
      color: '#ff7700'
    },
    {
      name: ItemsStatus.READY_TO_PICK_UP,
      label: 'moduleList.gp.orders.status.readyForPickup',
      icon: 'concierge',
      count: 0,
      color: '#ffe600'
    },
    {
      name: ItemsStatus.WITH_GP,
      label: 'moduleList.gp.orders.status.itemWithYou',
      icon: 'approval_delegation',
      count: 0,
      color: '#99007f'
    },
    {
      name: ItemsStatus.ON_DELIVERY,
      label: 'moduleList.client.orders.status.onDelivery',
      icon: 'flightsmode',
      count: 0,
      color: '#0015ff'
    },
    {
      name: ItemsStatus.EXCEPTION,
      label: 'moduleList.client.orders.status.exception',
      icon: 'error',
      count: 0,
      color: '#ff0000'
    },
    {
      name: ItemsStatus.DELIVERED, //ItemsStatus.FINALIZED
      label: 'moduleList.client.orders.status.delivered',
      icon: 'done',
      count: 0,
      color: '#40a832'
    }]; 
  }