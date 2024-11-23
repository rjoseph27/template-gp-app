import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarrierDashboardComponent } from "./dashboard/dashboard.component";
import { CarrierApplicationResolver } from "./application.resolver";
import { CarrierDashboardResolver } from "./dashboard/gp-dashboard.resolver";
import { CarrierRoutes } from "./carrier.route";
import { CarrierReportTripComponent } from "./request/report-trip/report-trip.component";
import { CarrierOrdersComponent } from "./orders/gp-orders/gp-orders.component";
import { CarrierOrderDetailsResolver } from "./orders/gp-orders/gp-order-details.resolver";
import { CarrierConfirmOrdersComponent } from "./orders/gp-orders/confirm-orders/confirm-orders.component";
import { CarrierItemOnHisWayComponent } from "./orders/gp-orders/item-on-his-way/item-on-his-way.component";
import { CarrierItemAtCheckpointComponent } from "./orders/gp-orders/item-at-checkpoint/item-at-checkpoint.component";
import { CarrierReadyForPickupComponent } from "./orders/gp-orders/ready-for-pickup/ready-for-pickup.component";
import { CarrierItemDeliveredGpComponent } from "./orders/gp-orders/item-delivered/item-delivered.component";
import { CarrierTrackingComponent } from "./orders/gp-orders/gp-tracking/gp-tracking.component";
import { CarrierTasksResolver } from "./orders/gp-orders/gp-tracking/tasks.resolver";
import { TrackingResolver } from "../services/tracking.resolver";
import { CarrierTripListComponent } from "./orders/trip-list/trip-list.component";
import { CarrierTripInfoResovler } from "./orders/trip-list/trip-info.resolver";
import { CarrierPlannedTripComponent } from "./orders/trip-list/planned-trip/planned-trip.component";
import { CarrierConfirmedTripComponent } from "./orders/trip-list/confirmed-trip/confirmed-trip.component";
import { CarrierTripDoneComponent } from "./orders/trip-list/trip-done/trip-done.component";

/**
 * @constant routes
 * @description The routes for the client module
 */
const routes: Routes = [
    { path: '', component: CarrierDashboardComponent, pathMatch: 'full', resolve: { userInfo: CarrierApplicationResolver, orders: CarrierDashboardResolver } },
    { path: `${CarrierRoutes.reportTrip}`, component: CarrierReportTripComponent, pathMatch: 'full', resolve: { userInfo: CarrierApplicationResolver } },
    { path: `${CarrierRoutes.gpOrders}`, children: [
        { path: '', component: CarrierOrdersComponent, pathMatch: 'full', resolve: { userInfo: CarrierApplicationResolver} },
        { path: `${CarrierRoutes.confirmOrders}`, component: CarrierConfirmOrdersComponent, pathMatch: 'full', resolve: { orderDetails: CarrierOrderDetailsResolver, userInfo: CarrierApplicationResolver } },
        { path: `${CarrierRoutes.itemOnHisWay}`, component: CarrierItemOnHisWayComponent, pathMatch: 'full', resolve: { orderDetails: CarrierOrderDetailsResolver, userInfo: CarrierApplicationResolver } },
        { path: `${CarrierRoutes.itemAtCheckpoint}`, component: CarrierItemAtCheckpointComponent, pathMatch: 'full', resolve: { orderDetails: CarrierOrderDetailsResolver, userInfo: CarrierApplicationResolver }},
        { path: `${CarrierRoutes.readyForPickup}`, component: CarrierReadyForPickupComponent, pathMatch: 'full', resolve: { orderDetails: CarrierOrderDetailsResolver, userInfo: CarrierApplicationResolver }},
        { path: `${CarrierRoutes.itemDeliveredGp}`, component: CarrierItemDeliveredGpComponent, pathMatch: 'full', resolve: { orderDetails: CarrierOrderDetailsResolver, userInfo: CarrierApplicationResolver }},
        { path: `${CarrierRoutes.gpTracking}`, component: CarrierTrackingComponent, pathMatch: 'full', resolve: { trip: TrackingResolver, tasks: CarrierTasksResolver, userInfo: CarrierApplicationResolver }},
    ] },
    { path: `${CarrierRoutes.tripList}`, children: [
        { path: '', component: CarrierTripListComponent, pathMatch: 'full', resolve: { userInfo: CarrierApplicationResolver} },
        { path: `${CarrierRoutes.plannedTrip}`, component: CarrierPlannedTripComponent, pathMatch: 'full', resolve: { tripDetails: CarrierTripInfoResovler, userInfo: CarrierApplicationResolver } },
        { path: `${CarrierRoutes.confirmedTrip }`, component: CarrierConfirmedTripComponent, pathMatch: 'full', resolve: { tripDetails: CarrierTripInfoResovler, userInfo: CarrierApplicationResolver }},
        { path: `${CarrierRoutes.tripDone}`, component: CarrierTripDoneComponent, pathMatch: 'full', resolve: { tripDetails: CarrierTripInfoResovler, userInfo: CarrierApplicationResolver }},
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarrierRouteModule { }