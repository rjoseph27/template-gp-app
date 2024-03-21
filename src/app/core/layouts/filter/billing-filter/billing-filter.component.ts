import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EMAIL_VALIDATION } from "../../../../misc/constants/validations";

/**
 * @component GhBillingFilterComponent
 * @description The billing filter component
 */
@Component({
    selector: 'gh-billing-filter',
    templateUrl: 'billing-filter.component.html',
    styleUrls: ['./billing-filter.component.scss'],
  })
  export class GhBillingFilterComponent {
    /**
     * @description The label of the billing filter
     * @type {string}
     */
    @Input() label: string;

    /**
     * @description An event emitter for the filter change
     * @type {EventEmitter<string>}
     */
    @Output() filterChange = new EventEmitter<string>();

    /**
     * @description The billing filter form
     * @type {FormGroup}
     */
    protected readonly billingFilterForm = new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
    });

    /**
    * @description The name of the email field
    * @type {string}
    */
    protected readonly emailField: string = 'email';

    /**
    * @description The error messages of the email field
    * @type {Map<string, string>}
    */
    protected readonly emailErrorCaptions = new Map<string, string>([
        [EMAIL_VALIDATION, "global.credentials.errors.email.email"],
    ]);

    /**
     * @description A method to filter the billing
     * @returns {void}
     */
    protected filterBilling() {
        this.filterChange.emit(this.billingFilterForm.value.email);
    }
  }