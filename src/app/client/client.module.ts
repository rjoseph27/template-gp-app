import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLogInComponent } from './log-in/log-in.component';
import { CoreModule } from "../core/core.module";


/**
 * @module ClientModule
 * @description The client module
 */
@NgModule({
    declarations: [ClientLogInComponent],
    imports: [
        CommonModule,
        CoreModule
    ],
})
export class ClientModule { }
