import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * @class LoadingService
 * @description The loading service
 */
@Injectable()
export class LoadingService {
    /**
     * @description backing field for loading$
     * @returns {BehaviorSubject<boolean>}
     */
    private readonly _loading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable that indicates the loading screen state.
     * @returns {Observable<boolean>}
     */
    readonly loading$ = this._loading$.asObservable();

    /**
     * @description The amount of ongoing loading
     * @type {number}
     */
    private ongoingLoading = 0;

    /**
     * @description A method that start the loading
     * @returns {void}
     */
    startLoading(): void {
        this._loading$.next(true)
        this.ongoingLoading++;
    }

    /**
     * @description A method that end the loading
     * @returns {void}
     */
    endLoading(): void {
        this.ongoingLoading--;
        if (this.ongoingLoading <= 0) {
            this._loading$.next(false)
        } 
    }

    /**
     * @description A method that force end the loading
     * @returns {void}
     */
    forceEndLoading(): void {
        this._loading$.next(false);
    }
}