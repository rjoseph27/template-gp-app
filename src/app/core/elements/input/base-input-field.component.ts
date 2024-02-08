import { Directive, EventEmitter, Input, Output } from "@angular/core";

/**
 * @abstract
 * @class BaseInputFieldComponent
 * @description The base input field component that provides common properties for all input field components.
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
     * @type {string}
     */
    @Input() name: string;

    /**
     * @description The value of the input field
     * @type {string}
     */
    @Input() value: string;

    /**
     * @description The type of the input field
     * @type {number}
     */
    @Input() maxLength: number;

    /**
     * @description The error message of the input field
     * @type {string}
     */
    @Input() errorMessage: string;

    /**
     * @description An event emitter that emits the value of the input field
     * @type {string}
     */
    @Output() valueChange = new EventEmitter<string>();
}
