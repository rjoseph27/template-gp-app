import { Injectable, inject } from '@angular/core';
import { firstValue } from '../../misc/function/firstValue';
import { ApiResponse, BaseServiceApi } from '../base.service.api'; 
import { ConnectResponse, CreateUser, Credentials } from './users.type';
import { Observable, debounceTime, delay } from 'rxjs';


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
     * @returns A promise of the response
     */
    connect(credentials: Credentials): Promise<ConnectResponse> {
        return firstValue(this.postRequest<ConnectResponse>('login', credentials));
    }

    /**
     * @description A method that creates a user.
     * @param newUser The user to create
     * @returns A promise of the response
     */
    createUser(newUser: CreateUser): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('create', newUser));
    }

    isEmailTaken(email: string): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('email-taken', { email: email }).pipe(debounceTime(2000)));
    }
}