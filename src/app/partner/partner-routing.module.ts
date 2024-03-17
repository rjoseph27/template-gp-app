import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PartnerMainComponent } from "./main/main.component";
import { PartnerApplicationResolver } from "./application.resolver";
import { PartnerRoutes } from "./partner.route";
import { PartnerRegisterItemComponent } from "./register-item/register-item.component";

/**
 * @constant routes
 * @description The routes for the partner module
 */
const routes: Routes = [
    { path: '', component: PartnerMainComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
    { path: `${PartnerRoutes.registerItem}`, children: [
        { path: '', component: PartnerRegisterItemComponent, pathMatch: 'full', resolve: { userInfo: PartnerApplicationResolver} },
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