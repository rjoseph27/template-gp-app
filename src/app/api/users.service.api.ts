import { Injectable, inject } from '@angular/core';
import { firstValue } from '../misc/function/firstValue';
import { BaseServiceApi } from './base.service.api'; 

/**
 * @interface
 * @description The credentials of the user
 */
export interface Credentials {
    /**
     * @description The email of the user
     * @type {string}
     */
    email: string;

    /**
     * @description The password of the user
     * @type {string}
     */
    password: string;
}

/**
 * @interface
 * @description The response of the connect method
 */
export interface ConnectResponse {
    /**
     * @description The message of the response
     * @type {string}
     */
    message: string;

    /**
     * @description The token of the response
     * @type {string}
     */
    token?: string;
}

/**
 * @class UsersServiceApi
 * @description The users service api
 */
@Injectable()
export class UsersServiceApi extends BaseServiceApi {
    /** @inheritdoc */
    override apiName: string = 'users'; 

    /**
     * @description A method that log in the user.
     * @param credentials The credentials of the user
     * @returns TODO return a jwt token
     */
    connect(credentials: Credentials): Promise<ConnectResponse> {
        return firstValue(this.postRequest<ConnectResponse>('login', credentials));
    }
}