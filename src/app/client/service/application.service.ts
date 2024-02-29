import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserType } from "../user-type.enum";

/**
 * @class ClientApplicationService
 * @description The application service
 */
@Injectable()
export class ClientApplicationService {
    /**
     * @description The backing field for the user mode
     * @type {BehaviorSubject<UserType>}
     */
    private readonly _userMode$ = new BehaviorSubject<UserType>(UserType.Client);

    /**
     * @description An observable of the user mode
     * @type {Observable<UserType>}
     */
    public readonly userMode$ = this._userMode$.asObservable();

    /**
     * @description The user mode
     */
    set userMode(mode: UserType) {
        this._userMode$.next(mode);
    }
    get userMode() {
        return this._userMode$.getValue();
    }
}