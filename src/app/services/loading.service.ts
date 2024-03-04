import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

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
     * @description A method that start the loading
     * @returns {void}
     */
    startLoading(): void {
        console.warn("start loading") // For Debug
        this._loading$.next(true)
    }

    /**
     * @description A method that end the loading
     * @returns {void}
     */
    endLoading(): void {
        console.warn("end loading") // For Debug
        this._loading$.next(false)
    }
}