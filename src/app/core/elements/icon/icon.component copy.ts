import { Component, Input } from '@angular/core';

/**
 * @title Icon Component
 * @component GpHubIconComponent 
 * @description The icon component that will be use throughout the application
 */
@Component({
  selector: 'gp-hub-icon',
  templateUrl: './icon.component.html',
})
export class GpHubIconComponent {
  /**
   * @description The name of the icon
   * @type {string}
   */
  @Input() name: string;
}
