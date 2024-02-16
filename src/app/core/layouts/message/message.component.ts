import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";

/**
 * @class GhMessageComponent
 * @description The message component
 */
@Component({
  selector: 'gh-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class GhMessageComponent {
  /**
   * @description The title of the message
   * @returns {string}
   */
  @Input() title: string;

  /**
   * @description The function will be used for the navigation when the user click on the button
   * @returns {() => void}
   */
  @Input() redirectFunction: () => void;

  /**
   * @description The caption of the button
   * @returns {string}
   */
  @Input() redirectionText: string;

  /**
   * @description The angular router service.
   * @type {Router}
   */
  private router: Router = inject(Router);
}
