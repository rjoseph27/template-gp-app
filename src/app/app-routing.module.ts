import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLogInComponent } from './client/log-in/log-in.component';
import { ClientRoutes } from './client.route';

/**
 * @constant routes
 * @description The routes for the application
 */
export const routes: Routes = [
    {
        path: `${ClientRoutes.client}`,
        children: [
            { path: '', redirectTo: `${ClientRoutes.login}`, pathMatch: 'full' },
            { path: `${ClientRoutes.login}`, component: ClientLogInComponent, pathMatch: 'full' }        
        ],
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
