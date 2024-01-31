import { Component, Input } from '@angular/core';

/**
 * @title Title Component
 * @component GhTitleComponent 
 * @description The title with the logo used to display the name of the page.
 */
@Component({
  selector: 'gh-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class GhTitleComponent {
  /**
   * @description The title
   * @type {string}
   */
  @Input() title: string;
}
