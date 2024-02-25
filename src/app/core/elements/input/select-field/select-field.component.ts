import { Component, Input } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';


/**
 * @interface SelectFieldOption
 * @description An interface for the select field option
 */
export interface SelectFieldOption {
  /**
   * @description The label of the select option
   * @type {string}
   */
  label: string;

  /**
   * @description The value of the select option
   * @type {string}
   */
  value: string;

  /**
   * @description The prefix of the select option
   * @type {string}
   */
  prefix?: string;
}

/**
 * @interface GroupedSelectFieldOption
 * @description An interface for the grouped select field option
 */
export interface GroupedSelectFieldOption {
  /**
   * @description The label of the select option group
   * @type {string}
   */
  label: string;

  /**
   * @description The options of the select option group
   * @type {string}
   */
  options: SelectFieldOption[];
}

/**
 * @class GhSelectFieldComponent
 * @description The select field component for the application
 */
@Component({
  selector: 'gh-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./../base-input-field.component.scss', './select-field.component.scss']
})
export class GhSelectFieldComponent extends BaseInputFieldComponent<string> { 
  /**
   * @description The options of the select field
   * @type {SelectFieldOption[]}
   */
  @Input() options: SelectFieldOption[];

  /**
   * @description The grouped options of the select field
   * @type {GroupedSelectFieldOption[]}
   */
  @Input() groupedOptions: GroupedSelectFieldOption[];

  /**
   * @description This methods ensure that the value is set to the default if the value is not set
   * @type {void}
   */
  protected onInputBlur(): void {
    this.valueChange.emit(this.value);
  }
}
