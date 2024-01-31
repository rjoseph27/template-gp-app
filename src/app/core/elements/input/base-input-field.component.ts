import { Directive, Input } from "@angular/core";

/**
 * @description The base input field component
 */
@Directive()
export abstract class BaseInputFieldComponent {
    /**
     * @description The label of the input field
     * @type {string}
     */
    @Input() label: string;

    /**
     * @description The placeholder of the input field
     * @type {string}
     */
    @Input() placeholder: string = '';

    /**
     * @description The name of the input field
     *  @type {string}
     */
    @Input() name: string;
}
