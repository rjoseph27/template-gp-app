import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLogInComponent } from './log-in/log-in.component';
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSignUpComponent } from './sign-up/sign-up.component';
import { ClientMainComponent } from './main/main.component';
import { ClientRouteModule } from './client-routing.module';
import { ClientApplicationResolver } from './application.resolver';
import { HttpClient } from '@angular/common/http';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ClientSendItemsComponent } from './request/send-items/send-items.component';
import { GlobalTranslateService } from '../services/global-translate.service';
import { filter, tap } from 'rxjs/operators';
import { ToRootTranslationHandler } from '../services/to-root-translation.handler';
import { ClientReportTripComponent } from './request/report-trip/report-trip.component';
import { ClientApplicationService } from './service/application.service';
import { RequestsServiceApi } from '../api/requests/requests.service.api';
import { ClientRequestsService } from './service/requests.service';
import { NotificationService } from '../services/notification.service';
import { ClientCalendarComponent } from './request/calendar/calendar.component';
import { ClientCalendarResolver } from './request/calendar/calendar.resolver';
import { ClientSendItemsService } from './service/send-items.service';
import { ClientItemsOrdersComponent } from './orders/client-orders/items-orders.component';
import { ClientWaitingGpConfirmationComponent } from './orders/client-orders/waiting-gp-confirmation/waiting-gp-confirmation.component';
import { ClientOrderDetailsResolver } from './orders/client-orders/client-order-details.resolver';
import { ClientGpOrdersComponent } from './orders/gp-orders/gp-orders.component';
import { ClientConfirmOrdersComponent } from './orders/gp-orders/confirm-orders/confirm-orders.component';
import { ClientGpOrderDetailsResolver } from './orders/gp-orders/gp-order-details.resolver';
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
import { ClientTripInfoResolver } from './orders/trip-list/trip-details.resolver';
import { ClientPlannedTripComponent } from './orders/trip-list/planned-trip/planned-trip.component';
import { ClientConfirmedTripComponent } from './orders/trip-list/confirmed-trip/confirmed-trip.component';
import { ClientTripDoneComponent } from './orders/trip-list/trip-done/trip-done.component';
import { ClientAlertListComponent } from './alert-list/alert-list.component';
import { ClientAlertListResolver } from './alert-list/alert-list.resolver';
import { ClientCreateAlertComponent } from './request/alert/create-alert/create-alert.component';


/**
 * @module ClientModule
 * @description The client module
 */
@NgModule({
    declarations: [
        ClientLogInComponent, 
        ClientSignUpComponent, 
        ClientMainComponent, 
        ClientSendItemsComponent,
        ClientReportTripComponent,
        ClientCalendarComponent,
        ClientItemsOrdersComponent,
        ClientWaitingGpConfirmationComponent,
        ClientGpOrdersComponent,
        ClientConfirmOrdersComponent,
        ClientWaitingReceptionComponent,
        ClientItemAtCheckPointComponent,
        ClientItemWithGpComponent,
        ClientItemReadyForPickupComponent,
        ClientItemDeliveredComponent,
        ClientItemOnHisWayComponent,
        ClientGpItemAtCheckpointComponent,
        ClientReadyForPickupComponent,
        ClientItemWithYouComponent,
        ClientItemDeliveredGpComponent,
        ClientTripListComponent,
        ClientPlannedTripComponent,
        ClientConfirmedTripComponent,
        ClientTripDoneComponent,
        ClientAlertListComponent,
        ClientCreateAlertComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        ClientRouteModule,
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
        ClientApplicationResolver,
        ClientOrderDetailsResolver,
        ClientGpOrderDetailsResolver,
        ClientAlertListResolver,
        ClientCalendarResolver,
        ClientRequestsService,
        ClientSendItemsService,
        TranslateService,
        ClientApplicationService,
        RequestsServiceApi,
        NotificationService,
        ClientTripInfoResolver
    ]
})
export class ClientModule {
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
    return new TranslateHttpLoader(http, '/assets/i18n/client/', '.json');
}


