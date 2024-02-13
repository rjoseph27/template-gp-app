import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LAYOUTS_COMPONENTS } from './layouts/components';
import { ELEMENTS_COMPONENTS } from './elements/components';
import { MatIconModule } from '@angular/material/icon'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmailValidator, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

/**
 * @constant
 * @type {any[]}
 * @description The list of all the core components.
 */
const lists = [...LAYOUTS_COMPONENTS, ...ELEMENTS_COMPONENTS]

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
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    TranslateService,
  ],
  exports: [...lists]
})
export class CoreModule { }

/**
 * @function HttpLoaderFactory
 * @description Factory function for creating a new instance of TranslateHttpLoader.
 * @param {HttpClient} http - The HttpClient instance to be used by the TranslateHttpLoader.
 * @returns {TranslateHttpLoader} A new instance of TranslateHttpLoader.
 */
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}