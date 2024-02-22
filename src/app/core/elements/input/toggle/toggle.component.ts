import { Component, Input, TemplateRef } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';

/**
 * @component GhToggleComponent
 * @description The toggle component for the application
 */
@Component({
  selector: 'gh-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.component.scss']
})
export class GhToggleComponent extends BaseInputFieldComponent<boolean> {
  
}
