import { Observable, first } from "rxjs";

/**
 * @description Get the first value of an observable
 * @param observable The observable
 * @returns The first value of the observable
 */
export function firstValue<T>(observable: Observable<T>): Promise<T> {
    return observable.pipe(first()).toPromise()
}