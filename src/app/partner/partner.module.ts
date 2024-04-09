import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ToRootTranslationHandler } from "../services/to-root-translation.handler";
import { GlobalTranslateService } from "../services/global-translate.service";
import { filter, tap } from "rxjs/operators";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PartnerLogInComponent } from "./log-in/log-in.component";
import { PartnerMainComponent } from "./main/main.component";
import { PartnerRouteModule } from "./partner-routing.module";
import { PartnerApplicationResolver } from "./application.resolver";
import { PartnerRegisterItemComponent } from "./register-item/register-item.component";
import { PartnerRegisterItemViewComponent } from "./register-item/register-item-view/register-item-view.component";
import { PartnerRegisterItemViewResolver } from "./register-item/register-item-view/register-item-view.resolver";
import { PartnerRegisterItemEditComponent } from "./register-item/register-item-edit/register-item-edit.component";
import { PartnerRegisterItemService } from "./service/register-item.service";
import { PartnerRegisterItemEditResolver } from "./register-item/register-item-edit/register-item-edit.resolver";
import { NotificationService } from "../services/notification.service";
import { PartnerBillingComponent } from "./billing/billing.component";
import { PartnerBillingResolver } from "./billing/billing.resolver";
import { PartnerBillingViewComponent } from "./billing/billing-view/billing-view.component";
import { PartnerGpPickUpComponent } from "./gp-pick-up/gp-pick-up.component";
import { PartnerGpPickUpViewComponent } from "./gp-pick-up/gp-pick-up-view/gp-pick-up-view.component";
import { PartnerDispatchingComponent } from "./dispatching/dispatching.component";
import { PartnerDispatchingViewComponent } from "./dispatching/dispatching-view/dispatching-view.component";
import { PartnerConfirmTripComponent } from "./dispatching/dispatching-view/confirm-trip/confirm-trip.component";
import { PartnerManageTrackingComponent } from "./dispatching/dispatching-view/manage-tracking/manage-tracking.component";
import { PartnerTripInfoResolver } from "./dispatching/trip-info.resolver";
import { PartnerTasksResolver } from "./dispatching/tasks.resolver";
import { PartnerChangeDateComponent } from "./dispatching/dispatching-view/change-date/change-date.component";
import { PartnerReceiveItemComponent } from "./receive-item/receive-item.component";
import { PartnerReceiveItemViewComponent } from "./receive-item/receive-item-view/receive-item-view.component";
import { PartnerReceiveItemViewResolver } from "./receive-item/receive-item.resolver";

/**
 * @module PartnerModule
 * @description The partner module
 */
@NgModule({
    declarations: [
        PartnerLogInComponent,
        PartnerMainComponent,
        PartnerRegisterItemComponent,
        PartnerRegisterItemViewComponent,
        PartnerRegisterItemEditComponent,
        PartnerBillingComponent,
        PartnerBillingViewComponent,
        PartnerGpPickUpComponent,
        PartnerGpPickUpViewComponent,
        PartnerDispatchingComponent,
        PartnerDispatchingViewComponent,
        PartnerConfirmTripComponent,
        PartnerManageTrackingComponent,
        PartnerChangeDateComponent,
        PartnerReceiveItemComponent,
        PartnerReceiveItemViewComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        PartnerRouteModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
            },
            extend: true,
            isolate: true,
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: ToRootTranslationHandler
              }
        })
    ],
    providers: [
        PartnerApplicationResolver,
        PartnerRegisterItemViewResolver,
        PartnerRegisterItemService,
        PartnerRegisterItemEditResolver,
        PartnerTripInfoResolver,
        NotificationService,
        PartnerBillingResolver,
        PartnerTasksResolver,
        PartnerReceiveItemViewResolver
    ]
})
export class PartnerModule {
    /**
     * @constructor
     * @param globalTranslateService The global translate service
     * @param translateService The translate service
     */
    constructor(globalTranslateService: GlobalTranslateService, translateService: TranslateService){
        globalTranslateService.currentLanguage$.pipe(
            filter(lang => !!lang),
            tap(lang => translateService.use(lang))
        ).subscribe()
    
    }
 }

/**
 * @function HttpLoaderFactory
 * @description Factory function for creating a new instance of TranslateHttpLoader.
 * @param {HttpClient} http - The HttpClient instance to be used by the TranslateHttpLoader.
 * @returns {TranslateHttpLoader} A new instance of TranslateHttpLoader.
 */
function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, '/assets/i18n/partner/', '.json');
}
