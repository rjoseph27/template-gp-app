import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValue } from '../misc/function/firstValue';
import { BaseServiceApi } from './base.service.api'; 
export interface Credentials {
    email: string;
    password: string;
}

@Injectable()
export class UsersServiceApi extends BaseServiceApi {
    /** @inheritdoc */
    override apiName: string = 'users'; 

    /**
     * @description A method that log in the user.
     * @param credentials The credentials of the user
     * @returns TODO return a jwt token
     */
    connect(credentials: Credentials): any {
        return firstValue(this.postRequest<Credentials>('login', credentials));
    }
}