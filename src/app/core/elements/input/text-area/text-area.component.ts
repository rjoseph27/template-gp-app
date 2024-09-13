import { Component, Input, ViewChild } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';

/**
 * @class GhTextAreaComponent
 * @description The text area component for the application
 */
@Component({
  selector: 'gh-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./../base-input-field.component.scss']
})
export class GhTextAreaComponent extends BaseInputFieldComponent<string> {
  /**
   * @description The number of rows for the text area
   * @type {number}
   */
  @Input() rows: number = 1;
}
