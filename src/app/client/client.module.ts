import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLogInComponent } from './log-in/log-in.component';
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSignUpComponent } from './sign-up/sign-up.component';


/**
 * @module ClientModule
 * @description The client module
 */
@NgModule({
    declarations: [ClientLogInComponent, ClientSignUpComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule
    ],
})
export class ClientModule { }
