import { Component, Input } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { SelectFieldOption } from '../../../../misc/util/select-option.util';

@Component({
  selector: 'gh-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss', './../base-input-field.component.scss']
})
export class GhSelectFieldComponent extends BaseInputFieldComponent<string> { 
  /**
   * @description The options of the select field
   * @type {SelectFieldOption[]}
   */
  @Input() options: SelectFieldOption[]

  /**
   * @description This methods ensure that the value is set to the default if the value is not set
   * @type {void}
   */
  protected onInputBlur(): void {
    this.valueChange.emit(this.value);
  }
}
