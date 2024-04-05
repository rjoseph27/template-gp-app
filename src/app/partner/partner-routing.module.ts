import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PartnerMainComponent } from "./main/main.component";
import { PartnerApplicationResolver } from "./application.resolver";
import { PartnerRoutes } from "./partner.route";
import { PartnerRegisterItemComponent } from "./register-item/register-item.component";
import { PartnerRegisterItemViewComponent } from "./register-item/register-item-view/register-item-view.component";
import { PartnerRegisterItemViewResolver } from "./register-item/register-item-view/register-item-view.resolver";
import { PartnerRegisterItemEditComponent } from "./register-item/register-item-edit/register-item-edit.component";
import { PartnerRegisterItemEditResolver } from "./register-item/register-item-edit/register-item-edit.resolver";
import { PartnerBillingComponent } from "./billing/billing.component";
import { PartnerBillingResolver } from "./billing/billing.resolver";
import { PartnerBillingViewComponent } from "./billing/billing-view/billing-view.component";
import { PartnerGpPickUpComponent } from "./gp-pick-up/gp-pick-up.component";
import { PartnerGpPickUpViewComponent } from "./gp-pick-up/gp-pick-up-view/gp-pick-up-view.component";
import { PartnerDispatchingComponent } from "./dispatching/dispatching.component";
import { PartnerDispatchingViewComponent } from "./dispatching/dispatching-view/dispatching-view.component";
import { PartnerTripInfoResolver } from "./dispatching/trip-info.resolver";
import { PartnerTasksResolver } from "./dispatching/tasks.resolver";

/**
 * @constant routes
 * @description The routes for the partner module
 */
const routes: Routes = [
    { path: '', component: PartnerMainComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
    { path: `${PartnerRoutes.registerItem}`, children: [
        { path: '', component: PartnerRegisterItemComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
        { path: `${PartnerRoutes.registerItemView}`, children: [
            { path: '', component: PartnerRegisterItemViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerRegisterItemViewResolver} },
            { path: `${PartnerRoutes.registerItemEdit}`, component: PartnerRegisterItemEditComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerRegisterItemEditResolver } }
        ]},
    ]},
    { path: `${PartnerRoutes.billing}`, children: [
        { path: '', component: PartnerBillingComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, currency: PartnerBillingResolver} },
        { path: `${PartnerRoutes.billingView}`, component: PartnerBillingViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerRegisterItemViewResolver} }
    ]},
    { path: `${PartnerRoutes.gpPickUp}`, children: [
        { path: '', component: PartnerGpPickUpComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
        { path: `${PartnerRoutes.gpPickUpView}`, component: PartnerGpPickUpViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerRegisterItemViewResolver} }
    ]},
    { path: `${PartnerRoutes.dispatching}`, children: [
        { path: '', component: PartnerDispatchingComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
        { path: `${PartnerRoutes.dispatchingView}`, children: [
            { path: '', component: PartnerDispatchingViewComponent, pathMatch: 'full', resolve: { trip: PartnerTripInfoResolver, tasks: PartnerTasksResolver, userInfo: PartnerApplicationResolver } },
        ] }
    ]},
];

/**
 * @module PartnerRouteModule
 * @description The partner routing module
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnerRouteModule { }