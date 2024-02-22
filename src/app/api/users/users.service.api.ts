import { Injectable, inject } from '@angular/core';
import { firstValue } from '../../misc/function/firstValue';
import { ApiResponse, BaseServiceApi, DEBOUNCE_TIME } from '../base.service.api'; 
import { ConnectResponse, CreateUser, Credentials, ResetPassword, ResetPasswordGetRequestApiResponse, UpdateLanguage, UserInfo, UserInfoApiResponse } from './users.type';
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

    /**
     * @description A method that checks if the email is taken
     * @param email The email to check
     * @returns {Promise<ApiResponse>}
     */
    isEmailTaken(email: string): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('email-taken', { email: email }).pipe(debounceTime(DEBOUNCE_TIME)));
    }

    /**
     * @description A method that checks if the phone number is taken
     * @param phoneNumber The phone number to check
     * @returns {Promise<ApiResponse>}
     */
    isPhoneNumberTaken(phoneNumber: string): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('phone-number-taken', { phoneNumber: phoneNumber }).pipe(debounceTime(DEBOUNCE_TIME)));
    }

    /**
     * @description A method that activates the email
     * @param id The id of the email activation resquest
     * @returns {Promise<ApiResponse>}
     */
    activateEmail(id: string): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('activate-email', { id: id }))
    }


    /**
     * @description A method that requests a password reset
     * @param email The email of the user
     * @returns {Promise<ApiResponse>}
     */
    forgotPasswordRequest(email: string): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('forgot-password', { email: email }))
    }

    /**
     * @description A method to get the reset password request
     * @param id The id of the reset password request
     * @returns {Promise<ApiResponse>}
     */
    getResetPassword(id: string): Promise<ResetPasswordGetRequestApiResponse> {
        return firstValue(this.getRequest<ResetPasswordGetRequestApiResponse>('reset-password', id));
    }

    /**
     * @description A method to reset the password
     * @param resetPassword The reset password request
     * @returns {Promise<ApiResponse>}
     */
    resetPassword(resetPassword: ResetPassword): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('reset-password', resetPassword))
    }

    /**
     * @description A method to get the user info
     * @param id The id of the user
     * @returns {Promise<UserInfo>}
     */
    getUserInfo(id: string): Promise<UserInfoApiResponse> {
        return firstValue(this.getRequest<ApiResponse>('info', id));
    }

    /**
     * @description A method to update the user language
     * @param updateLanguage The update language request
     * @returns {Promise<ApiResponse>}
     */
    updateUserLanguage(updateLanguage: UpdateLanguage): Promise<ApiResponse> {
        return firstValue(this.postRequest<ApiResponse>('update-language', updateLanguage));
    }
} 