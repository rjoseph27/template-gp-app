import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { ClientModule } from "./client/client.module";
import { UsersService } from "./services/users.service";
import { HttpClientModule } from "@angular/common/http";
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
        ClientModule
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
        LoggedOutGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
