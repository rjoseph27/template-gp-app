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
        ]}
    ] }
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