import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLogInComponent } from './client/log-in/log-in.component';
import { ClientRoutes } from './client/client.route';
import { ClientSignUpComponent } from './client/sign-up/sign-up.component';
import { GlobalRoutes } from './global.route';
import { GhEmailActivationComponent } from './core/layouts/authentication/email-activation/email-activation.component';
import { EmailActivationResolver } from './core/layouts/authentication/email-activation/email-activation.resolver';
import { GhForgotPasswordComponent } from './core/layouts/authentication/forgot-password/forgot-password.component';
import { GhResetPasswordForgotPasswordComponent } from './core/layouts/authentication/forgot-password/reset-password/reset-password.component';
import { ResetPasswordResolver } from './core/layouts/authentication/forgot-password/reset-password/reset-password.resolver';
import { LoggedInGuard } from './misc/guard/logged-in.guard';
import { LoggedOutGuard } from './misc/guard/logged-out.guard';
import { PartnerRoutes } from './partner/partner.route';
import { PartnerLogInComponent } from './partner/log-in/log-in.component';
import { GhNotFoundComponent } from './core/layouts/not-found/not-found.component';
import { TrackingResolver } from './services/tracking.resolver';
import { ClientOrderTrackingComponent } from './client/orders/client-orders/order-tracking/order-tracking.component';
import { CarrierRoutes } from './carrier/carrier.route';
import { CarrierLogInComponent } from './carrier/log-in/log-in.component';
import { CarrierSignUpComponent } from './carrier/sign-up/sign-up.component';
import { ClientModuleResolver } from './services/client-module.resolver';
import { CarrierModuleResolver } from './services/carrier-module.resolver';

/**
 * @constant routes
 * @description The routes for the application
 */
export const routes: Routes = [
    {
        path: `${ClientRoutes.client}`, resolve: { boot: ClientModuleResolver },
        children: [
            { path: '', redirectTo: `${ClientRoutes.login}`, pathMatch: 'full' },
            { path: `${ClientRoutes.login}`, component: ClientLogInComponent, pathMatch: 'full', canActivate: [LoggedOutGuard]},
            { path: `${ClientRoutes.signup}`, component: ClientSignUpComponent, pathMatch: 'full', canActivate: [LoggedOutGuard]},
            { path: `${ClientRoutes.forgotPassword}`, component: GhForgotPasswordComponent, pathMatch: 'full', canActivate: [LoggedOutGuard] },
            { path: `${ClientRoutes.main}`, loadChildren: () => import('./client/client.module').then(m => m.ClientModule), canActivate: [LoggedInGuard] }       
        ],
    },
    {
        path: `${CarrierRoutes.carrier}` , resolve: { boot: CarrierModuleResolver },
        children: [
            { path: '', redirectTo: `${CarrierRoutes.login}`, pathMatch: 'full' },
            { path: `${CarrierRoutes.login}`, component: CarrierLogInComponent, pathMatch: 'full', canActivate: [LoggedOutGuard]},
            { path: `${CarrierRoutes.signup}`, component: CarrierSignUpComponent, pathMatch: 'full', canActivate: [LoggedOutGuard]},
            { path: `${CarrierRoutes.forgotPassword}`, component: GhForgotPasswordComponent, pathMatch: 'full', canActivate: [LoggedOutGuard] },
            { path: `${CarrierRoutes.main}`, loadChildren: () => import('./carrier/carrier.module').then(m => m.CarrierModule), canActivate: [LoggedInGuard] }       
        ],
    },
    {
        path: `${PartnerRoutes.partner}`,
        children: [
            { path: '', redirectTo: `${PartnerRoutes.login}`, pathMatch: 'full' },
            { path: `${PartnerRoutes.login}`, component: PartnerLogInComponent, pathMatch: 'full', canActivate: [LoggedOutGuard]},
            { path: `${PartnerRoutes.main}`, loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule), canActivate: [LoggedInGuard] }
        ],
    },
    {
        path: `${GlobalRoutes.emailActivation}`, component: GhEmailActivationComponent, pathMatch: 'full',
        resolve: {emailActivationStatus: EmailActivationResolver}
    },
    { 
        path: `${GlobalRoutes.resetPassword}`, component: GhResetPasswordForgotPasswordComponent, pathMatch: 'full', 
        resolve: {userId: ResetPasswordResolver}, canActivate: [LoggedOutGuard]
    },
    { path: `${GlobalRoutes.tracking}`, component: ClientOrderTrackingComponent, pathMatch: 'full', resolve: { trip: TrackingResolver }},
    { path: '', redirectTo: `${ClientRoutes.client}`, pathMatch: 'full' },
    { path: `${GlobalRoutes.notFound}`, component: GhNotFoundComponent, pathMatch: 'full' },
    { path: '**', redirectTo: `${GlobalRoutes.notFound}` }
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
    export class AppRoutingModule {}
