import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLogInComponent } from './client/log-in/log-in.component';
import { ClientRoutes } from './client.route';
import { ClientSignUpComponent } from './client/sign-up/sign-up.component';
import { GlobalRoutes } from './global.route';
import { GhEmailActivationComponent } from './core/layouts/authentication/email-activation/email-activation.component';
import { EmailActivationResolver } from './core/layouts/authentication/email-activation/email-activation.resolver';
import { GhForgotPasswordComponent } from './core/layouts/authentication/forgot-password/forgot-password.component';
import { GhResetPasswordForgotPasswordComponent } from './core/layouts/authentication/forgot-password/reset-password/reset-password.component';
import { ResetPasswordResolver } from './core/layouts/authentication/forgot-password/reset-password/reset-password.resolver';
import { LoggedInGuard } from './misc/guard/logged-in.guard';
import { LoggedOutGuard } from './misc/guard/logged-out.guard';

/**
 * @constant routes
 * @description The routes for the application
 */
export const routes: Routes = [
    {
        path: `${ClientRoutes.client}`,
        children: [
            { path: '', redirectTo: `${ClientRoutes.login}`, pathMatch: 'full' },
            { path: `${ClientRoutes.login}`, component: ClientLogInComponent, pathMatch: 'full', canActivate: [LoggedOutGuard]},
            { path: `${ClientRoutes.signup}`, component: ClientSignUpComponent, pathMatch: 'full', canActivate: [LoggedOutGuard]},
            { path: `${ClientRoutes.forgotPassword}`, component: GhForgotPasswordComponent, pathMatch: 'full', canActivate: [LoggedOutGuard] },
            { path: `${ClientRoutes.main}`, loadChildren: () => import('./client/client.module').then(m => m.ClientModule), canActivate: [LoggedInGuard] }       
        ],
    },
    {
        path: `${GlobalRoutes.emailActivation}`, component: GhEmailActivationComponent, pathMatch: 'full',
        resolve: {emailActivationStatus: EmailActivationResolver, canActivate: [LoggedOutGuard]}
    },
    { 
        path: `${GlobalRoutes.resetPassword}`, component: GhResetPasswordForgotPasswordComponent, pathMatch: 'full', 
        resolve: {userId: ResetPasswordResolver}, canActivate: [LoggedOutGuard]
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
