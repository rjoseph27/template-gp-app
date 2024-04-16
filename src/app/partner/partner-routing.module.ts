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
import { PartnerChangeDateComponent } from "./dispatching/dispatching-view/change-date/change-date.component";
import { PartnerReceiveItemComponent } from "./receive-item/receive-item.component";
import { PartnerReceiveItemViewComponent } from "./receive-item/receive-item-view/receive-item-view.component";
import { PartnerReceiveItemViewResolver } from "./receive-item/receive-item.resolver";
import { PartnerPayGpComponent } from "./pay-gp/pay-gp.component";
import { PartnerGpPickUpViewResolver } from "./gp-pick-up/gp-pick-up-view/gp-pick-up.resolver";
import { PartnerRedirectItemsComponent } from "./redirect-items/redirect-items.component";
import { PartnerRedirectItemsViewComponent } from "./redirect-items/redirect-items-view/redirect-items-view.component";
import { PartnerCommissionComponent } from "./commission/commission.component";
import { PartnerCommissionViewComponent } from "./commission/commission-view/commission-view.component";
import { PartnerCommissionItemViewResolver } from "./commission/commission-view/commission-view.resolver";

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
        { path: `${PartnerRoutes.gpPickUpView}`, component: PartnerGpPickUpViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerGpPickUpViewResolver} }
    ]},
    { path: `${PartnerRoutes.dispatching}`, children: [
        { path: '', component: PartnerDispatchingComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
        { path: `${PartnerRoutes.dispatchingView}`, children: [
            { path: '', component: PartnerDispatchingViewComponent, pathMatch: 'full', resolve: { trip: PartnerTripInfoResolver, tasks: PartnerTasksResolver, userInfo: PartnerApplicationResolver } },
            { path: `${PartnerRoutes.changeDate}`, component: PartnerChangeDateComponent, pathMatch: 'full', resolve: { trip: PartnerTripInfoResolver, tasks: PartnerTasksResolver, userInfo: PartnerApplicationResolver } }
        ]}
    ]},
    { path: `${PartnerRoutes.receiveItem}`, children: [
        { path: '', component: PartnerReceiveItemComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
        { path: `${PartnerRoutes.receiveItemView}`, component: PartnerReceiveItemViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerReceiveItemViewResolver} }
    ]},
    { path: `${PartnerRoutes.payGp}`, children: [
        { path: '', component: PartnerPayGpComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, currency: PartnerBillingResolver} },
        { path: `${PartnerRoutes.billingView}`, component: PartnerBillingViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerRegisterItemViewResolver} }
    ]},
    { path: `${PartnerRoutes.redirectItems}`, children: [
        { path: '', component: PartnerRedirectItemsComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, currency: PartnerBillingResolver} },
        { path: `${PartnerRoutes.redirectItemsView}`, component: PartnerRedirectItemsViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerRegisterItemViewResolver} }
    ]},
    { path: `${PartnerRoutes.commission}`, children: [
        { path: '', component: PartnerCommissionComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, currency: PartnerBillingResolver} },
        { path: `${PartnerRoutes.commissionView}`, component: PartnerCommissionViewComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver, orderDetails: PartnerCommissionItemViewResolver} }
    ]}
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