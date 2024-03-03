import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CLOSE_ICON } from "../../../../../misc/constants/icon";

/**
 * @class GhConsoleViewComponent
 * @description The console view component
 */
@Component({
  selector: 'gh-console-view',
  templateUrl: './console-view.component.html',
  styleUrl: './console-view.component.scss'
})
export class GhConsoleViewComponent {
  /**
   * @description The title of the console view
   * @type {string}
   */
  @Input() title: string;

  /**
   * @description The close icon
   * @type {string}
   */
  protected readonly closeIcon = CLOSE_ICON;

  /**
   * @description A method that close the console view
   * @returns void
   */
  @Output() readonly closed = new EventEmitter<void>();

  /**
   * @description A method that close the console view
   * @returns void
   */
  protected close(): void {
    this.closed.emit();
  }
}
