import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLogInComponent } from './log-in/log-in.component';


/**
 * @module ClientModule
 * @description The client module
 */
@NgModule({
  declarations: [ClientLogInComponent],
  imports: [
    CommonModule
  ]
})
export class ClientModule { }
