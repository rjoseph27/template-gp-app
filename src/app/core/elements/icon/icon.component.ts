import { Component, Input } from '@angular/core';

/**
 * @title Icon Component
 * @component GhIconComponent 
 * @description The icon component that will be use throughout the application
 */
@Component({
  selector: 'gh-icon',
  templateUrl: './icon.component.html',
})
export class GhIconComponent {
  /**
   * @description The name of the icon
   * @type {string}
   */
  @Input() name: string;
}
