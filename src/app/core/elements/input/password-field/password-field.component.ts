import { Component, Input } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { HIDE_PASSWORD_ICON, SHOW_PASSWORD_ICON } from '../../../../misc/constants/icon';
import { BehaviorSubject } from 'rxjs';
import { EIGHTCHARACTERS_VALIDATION, HASNOTLOWERCASE_VALIDATION, HASNOTNUMBER_VALIDATION, HASNOTSPECIALCHARACTER_VALIDATION, HASNOTUPPERCASE_VALIDATION } from '../../../../misc/validation/password.validator';

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
export class GhPasswordFieldComponent extends BaseInputFieldComponent<string> {
  /**
   * @description The password visibility icon
   * @type {string}
   */
  protected readonly passwordVisibility = SHOW_PASSWORD_ICON;

  /**
   * @description The password hidden icon
   * @type {string}
   */
  protected readonly passwordHidden = HIDE_PASSWORD_ICON;

  /**
   * @description The error type for the password field when the password has less than 8 characters.
   * @type {string}
   */
  protected readonly hasNotEightCharacters = EIGHTCHARACTERS_VALIDATION;

  /**
   * @description The error type for the password field when the password has no lowercase characters.
   * @type {string}
   */
  protected readonly hasNotLowerCase = HASNOTLOWERCASE_VALIDATION;

  /**
   * @description The error type for the password field when the password has no uppercase characters.
   * @type {string}
   */
  protected readonly hasNotUpperCase = HASNOTUPPERCASE_VALIDATION;

  /**
   * @description The error type for the password field when the password has no number characters.
   * @type {string}
   */
  protected readonly hasNotNumber = HASNOTNUMBER_VALIDATION;

  /**
   * @description The error type for the password field when the password has no special characters.
   * @type {string}
   */
  protected readonly hasNotSpecialCharacter = HASNOTSPECIALCHARACTER_VALIDATION;

  /**
   * @description A boolean that determines if the password requirements should be shown
   * @type {boolean}
   */
  @Input() showRequirements: boolean = false;

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
