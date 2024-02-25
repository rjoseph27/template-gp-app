import { Component, Input } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';

/**
 * @class GhNumberFieldComponent
 * @description The number field component for the application
 */
@Component({
  selector: 'gh-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./../base-input-field.component.scss']
})
export class GhNumberFieldComponent extends BaseInputFieldComponent<number> {
  /**
   * @description The minimum value of the number field
   * @type {number}
   */
  @Input() min: number;

  /**
   * @description The maximum value of the number field
   * @type {number}
   */
  @Input() max: number;

  /**
   * @description The step of the number field
   * @type {number}
   */
  @Input() step: number;
}
