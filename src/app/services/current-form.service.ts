import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

/**
 * @class CurrentFormService
 * @description The current form service
 */
@Injectable()
export class CurrentFormService {
    /**
     * @description The current form
     */
    currentForm: FormGroup;

    /**
     * @description Backing field for the submitting$ property.
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _submitting$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable that emits the submitting state of the form.
     */
    readonly submitting$ = this._submitting$.asObservable();

    /**
     * @description Set the submitting state of the form.
     */
    set submitting(loading: boolean) {
        this._submitting$.next(loading);
        if(loading)
        {
            this.currentForm.disable()
        } else {
            this.currentForm.enable()
        }
    }
}