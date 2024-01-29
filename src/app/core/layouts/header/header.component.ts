import { Component } from '@angular/core';
import { PREVIOUS_PAGE_ICON } from '../../constant/icon';
import { GpHubTranslateService } from '../../services/translate.service';

/**
 * @title Header Component
 * @component HeaderComponent 
 * @description The header component for the application
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /**
   * @description The previous page icon
   * @type {string}
   */
  protected readonly previousPageIcon = PREVIOUS_PAGE_ICON;

  /**
     * @constructor
     * @param {GpHubTranslateService} translate The translate service
     */
  constructor(private readonly translate: GpHubTranslateService) {
  }
}
