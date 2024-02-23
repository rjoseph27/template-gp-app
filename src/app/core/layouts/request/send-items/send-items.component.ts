import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CurrentFormService } from "../../../../services/current-form.service";
import { SelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { COUNTRY_SELECTION_OPTIONS } from "../../../../misc/constants/countries";
import { REQUIRED_VALIDATION } from "../../../../misc/constants/validations";

/**
 * @class GhSendItemsComponent
 * @description The send items component for the application
 */
@Component({
  selector: 'gh-send-items',
  templateUrl: './send-items.component.html',
  styleUrl: './send-items.component.scss',
})
export class GhSendItemsComponent implements OnInit {
  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

  /**
   * @description The name of the user country field.
   */
  protected readonly userCountryField = 'userCountry';

  /**
   * @description The options of the country
   * @type {SelectFieldOption[]}
   */
  protected readonly userCountryOptions: SelectFieldOption[] = COUNTRY_SELECTION_OPTIONS

  /**
   * @description The error messages for the country field
   * @type {Map<string, string>}
   */
  protected readonly userCountryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.signup.accountDetails.errors.country.required"],
  ]);
  
  /**
   * @description The send items form
   * @type {FormGroup}
   */
  protected get sendItemsForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.currentForm = new FormGroup({
      userCountry: new FormControl('', [Validators.required]),
    });
  }
}
