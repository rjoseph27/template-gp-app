import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NEXT_PAGE_ICON } from "../../../misc/constants/icon";

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
}
