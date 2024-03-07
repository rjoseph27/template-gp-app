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
import { ClientItemsOrdersComponent } from './client-orders/items-orders.component';


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
        ClientItemsOrdersComponent
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
        ClientCalendarResolver,
        ClientRequestsService,
        ClientSendItemsService,
        TranslateService,
        ClientApplicationService,
        RequestsServiceApi,
        NotificationService
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


