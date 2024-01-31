import { Component, Input } from '@angular/core';
import { APPLICATION_NAME } from '../../constants/application';

/**
 * @title Login Component
 * @component GhLoginComponent 
 * @description The base login component for the application
 */
@Component({
  selector: 'gh-login',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class GhLoginComponent{
  /**
   * @description The application name
   * @type {string}
   */
  protected readonly applicationName = APPLICATION_NAME;

  /**
   * @description The title of the login component
   * @type {string}
   */
  @Input() title: string;
}
