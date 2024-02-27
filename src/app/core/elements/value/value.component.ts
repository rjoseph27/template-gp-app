import { Component, Input } from '@angular/core';

/**
 * @title Value Component
 * @component GhValueComponent
 * @description The value component that will be use throughout the application
 */
@Component({
  selector: 'gh-value',
  templateUrl: './value.component.html',
  styleUrl: './value.component.scss'
})
export class GhValueComponent {
  /**
   * @description The value of the value component
   * @type {string}
   */
  @Input() value: string;
}
