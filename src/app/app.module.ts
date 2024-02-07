import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { ClientModule } from "./client/client.module";
import { UsersService } from "./services/users.service";
import { HttpClientModule } from "@angular/common/http";
import { UsersServiceApi } from "./api/users.service.api";

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
        providers: [UsersService, UsersServiceApi],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
