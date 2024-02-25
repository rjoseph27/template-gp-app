import { Component } from "@angular/core";

/**
 * @interface ItemInformation
 * @description The item information interface
 */
interface ItemInformation {
  /**
   * @description The name of the item
   * @type {string}
   */
  name:string;
}

/**
 * @class GhItemInformationComponent
 * @description The item information component for the application
 */
@Component({
  selector: 'gh-item-information',
  templateUrl: './item-information.component.html',
  styleUrl: './item-information.component.scss',
})
export class GhItemInformationComponent {}
