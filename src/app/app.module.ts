import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { CoreModule } from "./core/core.module";

/**
 * @module AppModule
 * @description This is the root module of the application
 */
@NgModule({
        declarations: [AppComponent],
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            CoreModule 
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
