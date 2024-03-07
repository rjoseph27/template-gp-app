import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LAYOUTS_COMPONENTS } from './layouts/components';
import { ELEMENTS_COMPONENTS } from './elements/components';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    TranslateModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [...lists]
})
export class CoreModule { }