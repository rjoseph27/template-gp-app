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
import { ClientGpOrderDetailsResolver } from './orders/gp-orders/gp-order-details.resolver';
import { ClientConfirmOrdersComponent } from './orders/gp-orders/confirm-orders/confirm-orders.component';
import { ClientWaitingReceptionComponent } from './orders/client-orders/waiting-reception/waiting-reception.component';
import { ClientItemAtCheckPointComponent } from './orders/client-orders/item-at-checkpoint/item-at-checkpoint.component';
import { ClientItemWithGpComponent } from './orders/client-orders/item-with-gp/item-with-gp.component';
import { ClientItemReadyForPickupComponent } from './orders/client-orders/item-ready-for-pickup/item-ready-for-pickup.component';
import { ClientItemDeliveredComponent } from './orders/client-orders/item-delivered/item-delivered.component';
import { ClientItemOnHisWayComponent } from './orders/gp-orders/item-on-his-way/item-on-his-way.component';
import { ClientGpItemAtCheckpointComponent } from './orders/gp-orders/item-at-checkpoint/item-at-checkpoint.component';
import { ClientReadyForPickupComponent } from './orders/gp-orders/ready-for-pickup/ready-for-pickup.component';
import { ClientItemWithYouComponent } from './orders/gp-orders/item-with-you/item-with-you.component';
import { ClientItemDeliveredGpComponent } from './orders/gp-orders/item-delivered/item-delivered.component';
import { ClientTripListComponent } from './orders/trip-list/trip-list.component';
import { ClientPlannedTripComponent } from './orders/trip-list/planned-trip/planned-trip.component';
import { ClientTripInfoResolver } from './orders/trip-list/trip-details.resolver';
import { ClientConfirmedTripComponent } from './orders/trip-list/confirmed-trip/confirmed-trip.component';
import { ClientTripDoneComponent } from './orders/trip-list/trip-done/trip-done.component';
import { ClientAlertListComponent } from './alert-list/alert-list.component';
import { ClientAlertListResolver } from './alert-list/alert-list.resolver';
import { ClientCreateAlertComponent } from './request/alert/create-alert/create-alert.component';
import { ClientEditAlertComponent } from './request/alert/edit-alert/edit-alert.component';
import { ClientEditAlertResolver } from './request/alert/edit-alert/edit-alert.resolver';
import { ClientOrderTrackingComponent } from './orders/client-orders/order-tracking/order-tracking.component';
import { ClientOrderTrackingResolver } from './orders/client-orders/order-tracking/order-tracking.resolver';

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
        { path: `${ClientRoutes.itemReadyForPickup}`, component: ClientItemReadyForPickupComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.itemDelivered}`, component: ClientItemDeliveredComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.tracking}`, component: ClientOrderTrackingComponent, pathMatch: 'full', resolve: { trip: ClientOrderTrackingResolver, userInfo: ClientApplicationResolver }}
    ] },
    { path: `${ClientRoutes.gpOrders}`, children: [
        { path: '', component: ClientGpOrdersComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
        { path: `${ClientRoutes.confirmOrders}`, component: ClientConfirmOrdersComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.itemOnHisWay}`, component: ClientItemOnHisWayComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.itemAtCheckpoint}`, component: ClientGpItemAtCheckpointComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.readyForPickup}`, component: ClientReadyForPickupComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.itemWithYou}`, component: ClientItemWithYouComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.itemDeliveredGp}`, component: ClientItemDeliveredGpComponent, pathMatch: 'full', resolve: { orderDetails: ClientGpOrderDetailsResolver, userInfo: ClientApplicationResolver }}
    ] },
    { path: `${ClientRoutes.tripList}`, children: [
        { path: '', component: ClientTripListComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
        { path: `${ClientRoutes.plannedTrip}`, component: ClientPlannedTripComponent, pathMatch: 'full', resolve: { tripDetails: ClientTripInfoResolver, userInfo: ClientApplicationResolver } },
        { path: `${ClientRoutes.confirmedTrip }`, component: ClientConfirmedTripComponent, pathMatch: 'full', resolve: { tripDetails: ClientTripInfoResolver, userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.tripDone}`, component: ClientTripDoneComponent, pathMatch: 'full', resolve: { tripDetails: ClientTripInfoResolver, userInfo: ClientApplicationResolver }},
    ] },
    { path: `${ClientRoutes.alertList}`, children: [
        { path: '', component: ClientAlertListComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver, alertList: ClientAlertListResolver}},
        { path: `${ClientRoutes.createAlert}`, component: ClientCreateAlertComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver }},
        { path: `${ClientRoutes.editAlert}`, component: ClientEditAlertComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver, alert: ClientEditAlertResolver }}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRouteModule { }