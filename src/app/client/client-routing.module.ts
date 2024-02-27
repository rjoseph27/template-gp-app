import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainComponent } from './main/main.component';
import { ClientApplicationResolver } from './application.resolver';
import { ClientSendItemsComponent } from './request/send-items/send-items.component';
import { ClientRoutes } from '../client.route';
import { ClientReportTripComponent } from './request/report-trip/report-trip.component';

/**
 * @constant routes
 * @description The routes for the client module
 */
const routes: Routes = [
    { path: '', component: ClientMainComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
    { path: `${ClientRoutes.sendItems}`, component: ClientSendItemsComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
    { path: `${ClientRoutes.reportTrip}`, component: ClientReportTripComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRouteModule { }