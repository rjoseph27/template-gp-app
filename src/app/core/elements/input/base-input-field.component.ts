import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

/**
 * @abstract
 * @class BaseInputFieldComponent
 * @description The base input field component that provides common properties for all input field components.
 */
@Directive()
export abstract class BaseInputFieldComponent<T> {
    /**
     * @description backing field for errorMessage$
     * @type {BehaviorSubject<string>}
     */
    private readonly _errorMessages$ = new BehaviorSubject<string>(undefined);

    /**
     * @description An observable that emits the error message of the input field
     * @type {Observable<string>}
     */
    protected readonly errorMessage$ = this._errorMessages$.asObservable();

    /**
     * @description backing field for errorValidations$
     * @type {BehaviorSubject<ValidationErrors>}
     */
    private readonly _errorValidations$ = new BehaviorSubject<ValidationErrors>(undefined);

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
     * @decription The error captions of the input field.
     * @type {Map<string, string>}
     */
    @Input() errorCaptions: Map<string, string>;

    /**
     * @description The error messages of the input field
     */
    @Input() set errors(value: ValidationErrors)
    {
        console.log(value);
        this._errorMessages$.next(undefined)
        if(this.errorCaptions && value) {
            const lists = Array.from(this.errorCaptions);
            const errorMap = lists.find(e => value[e[0]]);
            if(errorMap)
            {
                this._errorMessages$.next(errorMap[1]);
            }
        }
        this._errorValidations$.next(value);
    }
    get errors(): ValidationErrors {
        return this._errorValidations$.value;
    }

    /**
     * @description An event emitter that emits the value of the input field
     * @type {T}
     */
    @Output() valueChange = new EventEmitter<T>();
}
