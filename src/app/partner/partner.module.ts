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

/**
 * @module PartnerModule
 * @description The partner module
 */
@NgModule({
    declarations: [
        PartnerLogInComponent,
        PartnerMainComponent,
        PartnerRegisterItemComponent,
        PartnerRegisterItemViewComponent
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
        PartnerRegisterItemViewResolver
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
