import { Component } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { HIDE_PASSWORD, SHOW_PASSWORD } from '../../../../misc/constants/icon';
import { BehaviorSubject } from 'rxjs';

/**
 * @title Password Field Component
 * @component GhPasswordFieldComponent 
 * @description The password field component that will be use throughout the application
 */
@Component({
  selector: 'gh-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss', './../base-input-field.component.scss']
})
export class GhPasswordFieldComponent extends BaseInputFieldComponent {
  /**
   * @description The password visibility icon
   * @type {string}
   */
  protected readonly passwordVisibility = SHOW_PASSWORD;

  /**
   * @description The password hidden icon
   * @type {string}
   */
  protected readonly passwordHidden = HIDE_PASSWORD;

  /**
   * @description The backing field for the password visibility state
   * @type {BehaviorSubject<boolean>}
   */
  private readonly _hidePassword$ = new BehaviorSubject<boolean>(true);

  /**
   * @description The password visibility state
   * @type {boolean}
   */
  protected get hidePassword() {
    return this._hidePassword$.getValue();
  }

  /**
   * @description Toggle the password visibility state
   * @type {boolean}
   */
  protected togglePasswordState(): void{
    if(this.hidePassword) {
      this._hidePassword$.next(false);
    } else {
      this._hidePassword$.next(true);
    }
  }
}
