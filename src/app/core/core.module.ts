import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LAYOUTS_COMPONENTS } from './layouts/components';
import { ELEMENTS_COMPONENTS } from './elements/components';
import { MatIconModule } from '@angular/material/icon'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GpHubTranslateService } from './services/translate.service';

/**
 * @constant
 * @type {any[]}
 * @description The list of all the core components.
 */
const lists = [...LAYOUTS_COMPONENTS,...ELEMENTS_COMPONENTS]

/**
 * @module CoreModule
 * @description This module provides core functionality across the application.
 */
@NgModule({
  declarations: [...lists],
  imports: [
    MatIconModule,
    CommonModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [GpHubTranslateService],
  exports: [...lists]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}