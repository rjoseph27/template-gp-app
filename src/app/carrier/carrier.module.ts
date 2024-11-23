import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core/core.module";
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { CarrierRouteModule } from "./carrier-routing.module";
import { HttpClient } from "@angular/common/http";
import { ToRootTranslationHandler } from "../services/to-root-translation.handler";
import { GlobalTranslateService } from "../services/global-translate.service";
import { filter, tap } from "rxjs/operators";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CarrierSignUpComponent } from "./sign-up/sign-up.component";
import { CarrierMainComponent } from "./main/main.component";
import { CarrierLogInComponent } from "./log-in/log-in.component";
import { CarrierDashboardComponent } from "./dashboard/dashboard.component";
import { CarrierReportTripComponent } from "./request/report-trip/report-trip.component";
import { CarrierConfirmOrdersComponent } from "./orders/gp-orders/confirm-orders/confirm-orders.component";
import { CarrierTrackingComponent } from "./orders/gp-orders/gp-tracking/gp-tracking.component";
import { CarrierItemAtCheckpointComponent } from "./orders/gp-orders/item-at-checkpoint/item-at-checkpoint.component";
import { CarrierItemDeliveredGpComponent } from "./orders/gp-orders/item-delivered/item-delivered.component";
import { CarrierItemOnHisWayComponent } from "./orders/gp-orders/item-on-his-way/item-on-his-way.component";
import { CarrierReadyForPickupComponent } from "./orders/gp-orders/ready-for-pickup/ready-for-pickup.component";
import { CarrierApplicationResolver } from "./application.resolver";
import { CarrierDashboardResolver } from "./dashboard/gp-dashboard.resolver";
import { CarrierOrderDetailsResolver } from "./orders/gp-orders/gp-order-details.resolver";
import { CarrierOrdersComponent } from "./orders/gp-orders/gp-orders.component";
import { CarrierConfirmedTripComponent } from "./orders/trip-list/confirmed-trip/confirmed-trip.component";
import { CarrierPlannedTripComponent } from "./orders/trip-list/planned-trip/planned-trip.component";
import { CarrierTripDoneComponent } from "./orders/trip-list/trip-done/trip-done.component";
import { CarrierTasksResolver } from "./orders/gp-orders/gp-tracking/tasks.resolver";
import { CarrierTripListComponent } from "./orders/trip-list/trip-list.component";
import { CarrierTripInfoResovler } from "./orders/trip-list/trip-info.resolver";
import { CarrierRequestsService } from "./service/requests.service";
import { CarrierModuleResolver } from "../services/carrier-module.resolver";

/**
 * @module CarrierModule
 * @description The carrier module
 */
@NgModule({
    declarations: [
        CarrierSignUpComponent,
        CarrierMainComponent,
        CarrierLogInComponent,
        CarrierDashboardComponent,
        CarrierReportTripComponent,
        CarrierConfirmOrdersComponent,
        CarrierTrackingComponent,
        CarrierItemAtCheckpointComponent,
        CarrierItemDeliveredGpComponent,
        CarrierItemOnHisWayComponent,
        CarrierReadyForPickupComponent,
        CarrierOrdersComponent,
        CarrierConfirmedTripComponent,
        CarrierPlannedTripComponent,
        CarrierTripDoneComponent,
        CarrierTripListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        CarrierRouteModule,
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
    exports: [],
    providers: [
        CarrierRequestsService,
        CarrierApplicationResolver,
        CarrierDashboardResolver,
        CarrierOrderDetailsResolver,
        CarrierTasksResolver,
        CarrierTripInfoResovler,
        CarrierModuleResolver
    ]
})
export class CarrierModule {
    /**
     * @constructor
     * @param globalTranslateService The global translate service
     * @param translateService The translate service
     */
    constructor(globalTranslateService: GlobalTranslateService, translateService: TranslateService){
        globalTranslateService.currentLanguage$.pipe(
            filter(lang => !!lang),
            tap(lang => translateService.use(lang)),
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
    return new TranslateHttpLoader(http, '/assets/i18n/client/', '.json');
}

