import { Component, } from '@angular/core';

/**
 * @constant
 * @description The title of the application
 */
const ACCOUNT_PAGE_TITLE = 'account';

/**
 * @title Log In Component
 * @component GpHubIconComponent 
 * @description The log in page for the users of the application.
 */
@Component({
  selector: 'client-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class ClientLogInComponent {
  /**
   * @description The title of the page
   * @type {string}
   */
  protected readonly pageTitle = ACCOUNT_PAGE_TITLE;
}
