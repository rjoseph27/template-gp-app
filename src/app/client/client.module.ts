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
import { ClientWaitingReceptionComponent } from './orders/client-orders/waiting-reception/waiting-reception.component';
import { ClientItemReadyForPickupComponent } from './orders/client-orders/item-ready-for-pickup/item-ready-for-pickup.component';
import { ClientItemDeliveredComponent } from './orders/client-orders/item-delivered/item-delivered.component';
import { ClientAlertListComponent } from './alert-list/alert-list.component';
import { ClientAlertListResolver } from './alert-list/alert-list.resolver';
import { ClientCreateAlertComponent } from './request/alert/create-alert/create-alert.component';
import { ClientEditAlertComponent } from './request/alert/edit-alert/edit-alert.component';
import { ClientEditAlertResolver } from './request/alert/edit-alert/edit-alert.resolver';
import { ClientOrderTrackingComponent } from './orders/client-orders/order-tracking/order-tracking.component';
import { ClientAlertMatchResolver } from './request/alert/alert-match.resolver';
import { ClientRescheduleOrderResolver } from './orders/client-orders/reschedule-order.resolver';
import { ClientDashboardComponent } from './dashboard/dashboard.component';
import { ClientDashboardClientResolver } from './dashboard/client-dashboard.resolver';
import { ClientDashboardGpResolver } from './dashboard/gp-dashboard.resolver';
import { ClientModuleResolver } from '../services/client-module.resolver';

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
        ClientCalendarComponent,
        ClientItemsOrdersComponent,
        ClientWaitingGpConfirmationComponent,
        ClientWaitingReceptionComponent,
        ClientItemReadyForPickupComponent,
        ClientItemDeliveredComponent,
        ClientAlertListComponent,
        ClientCreateAlertComponent,
        ClientEditAlertComponent,
        ClientOrderTrackingComponent,
        ClientDashboardComponent
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
    exports: [
        ClientOrderTrackingComponent
    ],
    providers: [
        ClientApplicationResolver,
        ClientOrderDetailsResolver,
        ClientEditAlertResolver,
        ClientAlertListResolver,
        ClientCalendarResolver,
        ClientRequestsService,
        ClientSendItemsService,
        TranslateService,
        ClientApplicationService,
        RequestsServiceApi,
        NotificationService,
        ClientAlertMatchResolver,
        ClientRescheduleOrderResolver,
        ClientDashboardClientResolver,
        ClientDashboardGpResolver,
        ClientModuleResolver
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


