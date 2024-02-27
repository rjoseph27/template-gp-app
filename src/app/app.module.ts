import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { ClientModule } from "./client/client.module";
import { UsersService } from "./services/users.service";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { UsersServiceApi } from "./api/users/users.service.api";
import { NotificationService } from "./services/notification.service";
import { NavigationService } from "./services/navigation.service";
import { EmailTakenValidator } from "./misc/validation/email-taken.validation";
import { PhoneNumberTakenValidator } from "./misc/validation/phone-number-taken.validator";
import { EmailActivationResolver } from "./core/layouts/authentication/email-activation/email-activation.resolver";
import { LoadingService } from "./services/loading.service";
import { ResetPasswordResolver } from "./core/layouts/authentication/forgot-password/reset-password/reset-password.resolver";
import { LoggedInGuard } from "./misc/guard/logged-in.guard";
import { LoggedOutGuard } from "./misc/guard/logged-out.guard";
import { AuthInterceptor } from "./services/auth.interceptor";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { GlobalTranslateService } from "./services/global-translate.service";
import { ToRootTranslationHandler } from "./services/to-root-translation.handler";
import { ModalService } from "./services/modal.service";

/**
 * @module AppModule
 * @description This is the root module of the application
 */
@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        ClientModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            },
          }),
    ],
    providers: [
        UsersService, 
        UsersServiceApi, 
        NotificationService, 
        NavigationService, 
        EmailTakenValidator,
        PhoneNumberTakenValidator,
        EmailActivationResolver,
        LoadingService,
        ResetPasswordResolver,
        LoggedInGuard,
        LoggedOutGuard,
        TranslateService,
        GlobalTranslateService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ToRootTranslationHandler,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

/**
 * @function HttpLoaderFactory
 * @description Factory function for creating a new instance of TranslateHttpLoader.
 * @param {HttpClient} http - The HttpClient instance to be used by the TranslateHttpLoader.
 * @returns {TranslateHttpLoader} A new instance of TranslateHttpLoader.
 */
function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
  }