import { Component, Input, ViewChild } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { NgModel } from '@angular/forms';

/**
 * @title Text Field Component
 * @component GhTextFieldComponent 
 * @description The text field component that will be use throughout the application
 */
@Component({
  selector: 'gh-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./../base-input-field.component.scss']
})
export class GhTextFieldComponent extends BaseInputFieldComponent<string> {
  /**
   * @description A boolean value that determines if the input field has an error or not.
   * @type {boolean} 
   */
  @Input() externalError = false

  /**
   * @description The input field
   * @type {NgModel}
   */
  @ViewChild('input') input: NgModel;

  /**
   * @description A boolean value that determines if the input field is touched and dirty
   * @type {boolean}
   */
  get inputTouchedAndDirty(): boolean
  {
      return this.input.touched && this.input.dirty;
  }
}
