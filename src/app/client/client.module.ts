import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLogInComponent } from './log-in/log-in.component';
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { ClientMainComponent } from './main/main.component';
import { ClientRouteModule } from './client-routing.module';
import { MainPageResolver } from './main/main.resolver';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


/**
 * @module ClientModule
 * @description The client module
 */
@NgModule({
    declarations: [ClientLogInComponent, ClientSignUpComponent, ClientMainComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        ClientRouteModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
        })
    ],
    providers: [
        MainPageResolver
    ]
})
export class ClientModule { }

/**
 * @function HttpLoaderFactory
 * @description Factory function for creating a new instance of TranslateHttpLoader.
 * @param {HttpClient} http - The HttpClient instance to be used by the TranslateHttpLoader.
 * @returns {TranslateHttpLoader} A new instance of TranslateHttpLoader.
 */
function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, '/assets/i18n/client/', '.json');
  }
