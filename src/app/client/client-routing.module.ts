import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainComponent } from './main/main.component';
import { MainPageResolver } from './main/main.resolver';

/**
 * @constant routes
 * @description The routes for the client module
 */
const routes: Routes = [
    { path: '', component: ClientMainComponent, pathMatch: 'full', resolve: {userInfo: MainPageResolver} }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRouteModule { }