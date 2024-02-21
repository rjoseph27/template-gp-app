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
        ClientRouteModule
    ],
    providers: [
        MainPageResolver
    ]
})
export class ClientModule { }
