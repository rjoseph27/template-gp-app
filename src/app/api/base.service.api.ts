import { HttpClient, HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

/**
 * @interface ApiResponse
 * @description The response of the api
 */
export interface ApiResponse {
    /**
     * @description The message of the response
     * @type {string}
     */
    message: string;
}

/**
 * @description Transform the keys of an object to string
 */
export type StringKeys<T> = {
    [K in keyof T as string]: T[K];
};

/**
 * @constant
 * @description The time to wait before making a request to the server
 */
export const DEBOUNCE_TIME = 2000;

/**
 * @constant
 * @description The server url
 */
export const SERVER_URL = 'https://app-ry7rf2os6a-uc.a.run.app';

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
    protected readonly baseUrl: string = SERVER_URL;

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
    protected postRequest<T>(action: string, body: any): Observable<T> {
        return this.httpClient.post<T>(`${this.baseUrl}/${this.apiName}/${action}`, body);
    }

    /**
     * @description The get request
     * @param action The name of the api endpoint
     * @returns an observable of the response
     */
    protected getRequest<T>(action: string, param?: string): Observable<T> {
        const apiLink = `${this.baseUrl}/${this.apiName}/${action}`;
        if (param) {
            return this.httpClient.get<T>(`${apiLink}/${param}`);
        }
        return this.httpClient.get<T>(apiLink);
    }
}
