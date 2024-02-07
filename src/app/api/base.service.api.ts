import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

/**
 * @abstract
 * @class BaseService
 * @description The base service that provides common properties for all the api.
 */
export abstract class BaseServiceApi {
    /**
     * @description The base url of the api
     * @type {string}
     */
    protected readonly baseUrl: string = 'http://localhost:3000';

    /**
     * @description The name of the api
     * @type {string}
     */
    abstract apiName: string;

    /**
     * @description The http client
     * @type {HttpClient}
     */
    private readonly httpClient: HttpClient = inject(HttpClient);

    /**
     * @description The post request
     * @param action The name of the api endpoint
     * @param body  The body of the request
     * @returns an observable of the response
     */
    protected postRequest<T>(action: string, body: T): Observable<T> {
        return this.httpClient.post<T>(`${this.baseUrl}/${this.apiName}/${action}`, body);
    }
}
