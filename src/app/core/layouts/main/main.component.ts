import { Component, Input } from "@angular/core";
import { NEXT_PAGE_ICON } from "../../../misc/constants/icon";

/**
 * @interface GhModule
 * @description The interface for the module
 */
export interface GhModule {
  /**
   * @description The label of the module
   * @type {string}
   */
  label: string;

  /**
   * @description The icon of the module
   * @type {string}
   */
  icon: string;

  /**
   * @description The action to be taken when the module is selected
   * @type {() => void}
   */
  action: () => void;
}

/**
 * @class GhMainComponent
 * @description The layout of the main page of the application
 */
@Component({
  selector: 'gh-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class GhMainComponent {
  /**
   * @description The icon to be used to navigate into a module.
   * @type {string}
   */
  protected readonly nextPageIcon = NEXT_PAGE_ICON;

  /**
   * @description The modules of the application
   * @type {GhModule[]}
   */
  @Input() modules: GhModule[] = [];

  /**
   * @description A boolean value that determines if the body of the main component should be displayed or not
   * @type {boolean}
   */
  @Input() displayBody = true;
}
