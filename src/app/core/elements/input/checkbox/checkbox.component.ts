import { Component, Input, TemplateRef } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';

/**
 * @class GhCheckboxComponent
 * @description The checkbox component
 */
@Component({
  selector: 'gh-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./../base-input-field.component.scss']
})
export class GhCheckboxComponent extends BaseInputFieldComponent<boolean> {
  /**
   * @description The caption of the checkbox
   * @type {TemplateRef<any>}
   */
  @Input() caption: TemplateRef<any>;
}
