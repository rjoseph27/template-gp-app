import { Component, Input, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MenuItem } from './menu.interface';

/**
 * @title Menu Component
 * @component GhMenuComponent 
 * @description The menu component that will be use throughout the application
 */
@Component({
  selector: 'gh-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class GhMenuComponent {
  /**
   * @description The reference to the menu.
   * @type {MatMenu}
   */
  @ViewChild('menu') matMenu: MatMenu;

  /**
   * @description The menu items
   * @type {MenuItem[]}
   */
  @Input() menuItems: MenuItem[] = [];
}
