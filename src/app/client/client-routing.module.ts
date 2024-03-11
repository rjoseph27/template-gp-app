import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainComponent } from './main/main.component';
import { ClientApplicationResolver } from './application.resolver';
import { ClientSendItemsComponent } from './request/send-items/send-items.component';
import { ClientRoutes } from '../client.route';
import { ClientReportTripComponent } from './request/report-trip/report-trip.component';
import { ClientCalendarComponent } from './request/calendar/calendar.component';
import { ClientCalendarResolver } from './request/calendar/calendar.resolver';
import { ClientItemsOrdersComponent } from './orders/client-orders/items-orders.component';
import { ClientWaitingGpConfirmationComponent } from './orders/client-orders/waiting-gp-confirmation/waiting-gp-confirmation.component';
import { ClientOrderDetailsResolver } from './orders/client-orders/client-order-details.resolver';
import { ClientGpOrdersComponent } from './orders/gp-orders/gp-orders.component';
import { ClientConfirmOrdersResolver } from './orders/gp-orders/confirm-orders/confirm-orders.resolver';
import { ClientConfirmOrdersComponent } from './orders/gp-orders/confirm-orders/confirm-orders.component';
import { ClientWaitingReceptionComponent } from './orders/client-orders/waiting-reception/waiting-reception.component';
import { ClientItemAtCheckPointComponent } from './orders/client-orders/item-at-checkpoint/item-at-checkpoint.component';
import { ClientItemWithGpComponent } from './orders/client-orders/item-with-gp/item-with-gp.component';
import { ClientItemReadyForPickupComponent } from './orders/client-orders/item-ready-for-pickup/item-ready-for-pickup.component';
import { ClientItemDeliveredComponent } from './orders/client-orders/item-delivered/item-delivered.component';

/**
 * @constant routes
 * @description The routes for the client module
 */
const routes: Routes = [
    { path: '', component: ClientMainComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
    { path: `${ClientRoutes.sendItems}`, children: [
        { path: '', component: ClientSendItemsComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
        { path: `${ClientRoutes.calendar}`, component: ClientCalendarComponent, pathMatch: 'full', resolve: { calendarInfo: ClientCalendarResolver} }
    ] },
    { path: `${ClientRoutes.reportTrip}`, component: ClientReportTripComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
    { path: `${ClientRoutes.clientOrder}`, children: [
        { path: '', component: ClientItemsOrdersComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
        { path: `${ClientRoutes.waitingGpConfirmation}`, component: ClientWaitingGpConfirmationComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.waitingReception}`, component: ClientWaitingReceptionComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.atCheckPoint}`, component: ClientItemAtCheckPointComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.itemWithGp}`, component: ClientItemWithGpComponent, pathMatch: 'full', resolve: { orderDetails: ClientOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.itemReadyForPickup}`, component: ClientItemReadyForPickupComponent, pathMatch: 'full', resolve: { orderDetails: ClientConfirmOrdersResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.itemDelivered}`, component: ClientItemDeliveredComponent, pathMatch: 'full', resolve: { orderDetails: ClientConfirmOrdersResolver, userInfo: ClientApplicationResolver }}
    ] },

    { path: `${ClientRoutes.gpOrders}`, children: [
        { path: '', component: ClientGpOrdersComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
        { path: `${ClientRoutes.confirmOrders}`, component: ClientConfirmOrdersComponent, pathMatch: 'full', resolve: { orderDetails: ClientConfirmOrdersResolver, userInfo: ClientApplicationResolver } }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRouteModule { }