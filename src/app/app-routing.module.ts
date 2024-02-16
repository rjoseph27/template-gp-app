import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLogInComponent } from './client/log-in/log-in.component';
import { ClientRoutes } from './client.route';
import { ClientSignUpComponent } from './client/sign-up/sign-up.component';
import { GlobalRoutes } from './global.route';
import { GhEmailActivationComponent } from './core/layouts/authentication/email-activation/email-activation.component';
import { EmailActivationResolver } from './core/layouts/authentication/email-activation/email-activation.resolver';

/**
 * @constant routes
 * @description The routes for the application
 */
export const routes: Routes = [
    {
        path: `${ClientRoutes.client}`,
        children: [
            { path: '', redirectTo: `${ClientRoutes.login}`, pathMatch: 'full' },
            { path: `${ClientRoutes.login}`, component: ClientLogInComponent, pathMatch: 'full' },
            { path: `${ClientRoutes.signup}`, component: ClientSignUpComponent, pathMatch: 'full' }        
        ],
    },
    {
        path: 'email-activation/:id', component: GhEmailActivationComponent, pathMatch: 'full',
        resolve: {emailActivationStatus: EmailActivationResolver}
    },
    { path: '', redirectTo: `${ClientRoutes.client}`, pathMatch: 'full' },
];

/**
 * @module AppRoutingModule
 * @description The application routing module
 */
@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [
            RouterModule
        ]
    })
    export class AppRoutingModule { }
