import { Component, Input } from '@angular/core';
import { HELP_ICON } from '../../../misc/constants/icon';

/**
 * @class GhhelpComponent
 * @description The help component for the application
 */
@Component({
  selector: 'gh-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class GhhelpComponent {
  /**
   * @description The icon of the help component
   * @type {string}
   */
  protected readonly icon = HELP_ICON;

  /**
   * @description The tooltip of the help component
   * @type {string}
   */
  @Input() tooltip: string;
}
