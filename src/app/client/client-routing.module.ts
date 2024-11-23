import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientApplicationResolver } from './application.resolver';
import { ClientSendItemsComponent } from './request/send-items/send-items.component';
import { ClientRoutes } from './client.route';
import { ClientCalendarComponent } from './request/calendar/calendar.component';
import { ClientCalendarResolver } from './request/calendar/calendar.resolver';
import { ClientItemsOrdersComponent } from './orders/client-orders/items-orders.component';
import { ClientWaitingGpConfirmationComponent } from './orders/client-orders/waiting-gp-confirmation/waiting-gp-confirmation.component';
import { ClientOrderDetailsResolver } from './orders/client-orders/client-order-details.resolver';
import { ClientWaitingReceptionComponent } from './orders/client-orders/waiting-reception/waiting-reception.component';
import { ClientItemReadyForPickupComponent } from './orders/client-orders/item-ready-for-pickup/item-ready-for-pickup.component';
import { ClientItemDeliveredComponent } from './orders/client-orders/item-delivered/item-delivered.component';
import { ClientAlertListComponent } from './alert-list/alert-list.component';
import { ClientAlertListResolver } from './alert-list/alert-list.resolver';
import { ClientCreateAlertComponent } from './request/alert/create-alert/create-alert.component';
import { ClientEditAlertComponent } from './request/alert/edit-alert/edit-alert.component';
import { ClientEditAlertResolver } from './request/alert/edit-alert/edit-alert.resolver';
import { ClientOrderTrackingComponent } from './orders/client-orders/order-tracking/order-tracking.component';
import { TrackingResolver } from '../services/tracking.resolver';
import { ClientAlertMatchResolver } from './request/alert/alert-match.resolver';
import { ClientRescheduleOrderResolver } from './orders/client-orders/reschedule-order.resolver';
import { ClientDashboardComponent } from './dashboard/dashboard.component';
import { ClientDashboardClientResolver } from './dashboard/client-dashboard.resolver';
import { ClientDashboardGpResolver } from './dashboard/gp-dashboard.resolver';

/**
 * @constant routes
 * @description The routes for the client module
 */
const routes: Routes = [
    { path: '', component: ClientDashboardComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver, clientOrders: ClientDashboardClientResolver, gpOrders: ClientDashboardGpResolver } },
    { path: `${ClientRoutes.sendItems}`, children: [
        { path: '', component: ClientSendItemsComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
        { path: `${ClientRoutes.calendar}`, component: ClientCalendarComponent, pathMatch: 'full', resolve: { calendarInfo: ClientCalendarResolver, userInfo: ClientApplicationResolver } }
    ] },
    { path: `${ClientRoutes.clientOrder}`, children: [
        { path: '', component: ClientItemsOrdersComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
        { path: `${ClientRoutes.waitingGpConfirmation}`, component: ClientWaitingGpConfirmationComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.waitingReception}`, component: ClientWaitingReceptionComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.itemReadyForPickup}`, component: ClientItemReadyForPickupComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.itemDelivered}`, component: ClientItemDeliveredComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.tracking}`, component: ClientOrderTrackingComponent, pathMatch: 'full', resolve: { trip: TrackingResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.rescheduleOrder}`, component: ClientCalendarComponent, pathMatch: 'full', resolve: { calendarInfo: ClientRescheduleOrderResolver, userInfo: ClientApplicationResolver }},
    ] },
    { path: `${ClientRoutes.alertList}`, children: [
        { path: '', component: ClientAlertListComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver, alertList: ClientAlertListResolver}},
        { path: `${ClientRoutes.createAlert}`, component: ClientCreateAlertComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.editAlert}`, component: ClientEditAlertComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver, alert: ClientEditAlertResolver }},
        { path: `${ClientRoutes.alertMatch}`, component: ClientCalendarComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver, calendarInfo: ClientAlertMatchResolver }},
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRouteModule { }