import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";

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
            CoreModule 
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
