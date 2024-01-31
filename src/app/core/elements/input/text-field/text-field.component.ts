import { Component, Input } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';

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
export class GhTextFieldComponent extends BaseInputFieldComponent {}
