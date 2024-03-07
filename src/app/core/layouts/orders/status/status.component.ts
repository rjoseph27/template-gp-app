import { Component, Input } from "@angular/core";

/**
 * @interface Status
 * @description The status of the order
 */
export interface Status {
    /**
     * @description The label of the status
     * @type {string}
     */
    label: string;

    /**
     * @description The icon of the status
     * @type {string}
     */
    icon: string;

    /**
     * @description The action to be taken when the status is selected
     * @type {() => void}
     */
    action: () => void;
}

/**
 * @class GhStatusComponent
 * @description The status component
 */
@Component({
    selector: 'gh-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
  })
  export class GhStatusComponent {
    /**
     * @description The status of the order
     * @type {Status}
     */
    @Input() status: Status;
  }