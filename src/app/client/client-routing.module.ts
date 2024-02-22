import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainComponent } from './main/main.component';
import { ClientApplicationResolver } from './application.resolver';
import { ClientMakeRequestComponent } from './make-request/make-request.component';
import { ClientRoutes } from '../client.route';

/**
 * @constant routes
 * @description The routes for the client module
 */
const routes: Routes = [
    { path: '', component: ClientMainComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} },
    { path: `${ClientRoutes.makeRequest}`, component: ClientMakeRequestComponent, pathMatch: 'full', resolve: { userInfo: ClientApplicationResolver} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRouteModule { }