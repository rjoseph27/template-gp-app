import { Country } from "../../misc/enums/country.enum";
import { Genders } from "../../misc/enums/genders.enum";
import { ApiResponse, StringKeys } from "../base.service.api";
import { Language } from "../../misc/enums/language.enum";

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
export interface ConnectResponse extends ApiResponse {
    /**
     * @description The token of the response
     * @type {string}
     */
    token: string;

    /**
     * @description The id of the user
     * @type {string}
     */
    userId: string;
}

/**
 * @interface
 * @description The interface to create a user
 */
export interface CreateUser {
    /**
     * @description The email of the user
     * @type {string}
     */
    email: string;

    /**
     * @description The password of the user
     * @type {string}
     */
    password: string,

    /**
     * @description The first name of the user
     * @type {string}
     */
    firstName: string,

    /**
     * @description The last name of the user
     * @type {string}
     */
    lastName: string,

    /**
     * @description The date of birth of the user
     * @type {Date}
     */
    dateOfBirth: Date,

    /**
     * @description The gender of the user
     */
    gender: Genders,

    /**
     * @description The country of the user
     * @type {Country}
     */
    country: Country,

    /**
     * @description The phone number of the user
     * @type {string}
     */
    phoneNumber: string

    /**
     * @description The language of the user
     * @type {Language}
     */
    language: Language
}

/**
 * @enum
 * @description The status of the connection
 */
export enum ConnectStatus {
    /**
     * @description The wrong credentials has been inserted.
     */
    WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',

    /**
     * @description The right credentials has been inserted.
     */
    LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL',

    /**
     * @description Internal server error.
     */
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

/**
 * @enum
 * @description The status of the item that should be unique
 */
export enum UniqueValue {
    /**
     * @description The value is already taken.
     */
    TAKEN = 'TAKEN',

    /**
     * @description The value is not taken.
     */
    NOT_TAKEN = 'NOT_TAKEN'
}

/**
 * @enum
 * @description The response of the email activation request
 */
export enum EmailActivationRequestResponse {
    /**
     * @description The email has already been activated.
     */
    EMAIL_ALREADY_ACTIVATED = 'EMAIL_ALREADY_ACTIVATED',

    /**
     * @description The email has been activated.
     */
    EMAIL_ACTIVATED = 'EMAIL_ACTIVATED',

    /**
     * @description The email is invalid.
     */
    INVALID_EMAIL = 'INVALID_EMAIL',

    /**
     * @description The id is invalid.
     */
    INVALID_ID = 'INVALID_ID'
}

/**
 * @enum
 * @description The response of the sign up request
 */
export enum SignUpResponse {
    /**
     * @description The user has been created.
     */
    USER_CREATED = 'USER_CREATED',

    /**
     * @description The email is invalid.
     */
    INVALID_EMAIL = 'INVALID_EMAIL',

    /**
     * @description The password is invalid.
     */
    INVALID_PASSWORD = 'INVALID_PASSWORD',

    /**
     * @description The first name is invalid.
     */
    INVALID_FIRSTNAME = 'INVALID_FIRSTNAME',

    /**
     * @description The last name is invalid.
     */
    INVALID_LASTNAME = 'INVALID_LASTNAME',

    /**
     * @description The date of birth is invalid.
     */
    INVALID_DATE_OF_BIRTH = 'INVALID_DATE_OF_BIRTH',

    /**
     * @description No gender has been selected.
     */
    NO_GENDER = 'NO_GENDER',

    /**
     * @description No country has been selected.
     */
    NO_COUNTRY = 'NO_COUNTRY',

    /**
     * @description The phone number is invalid.
     */
    INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER',

    /**
     * @description The activation email has not been sent
     */
    MAIL_SERVER_ERROR = 'MAIL_SERVER_ERROR'
}

/**
 * @enum
 * @description The response of the forgot password request
 */
export enum ForgotPasswordRequestResponse {
    /**
     * @description The email has been sent
     */
    EMAIL_SENT = 'EMAIL_SENT',

    /**
     * @description The email is not found
     */
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',

    /**
     * @description The password reset mail has not been sent
     */
    MAIL_SERVER_ERROR = 'MAIL_SERVER_ERROR'
}

/**
 * @interface
 * @description The reset password request
 */
export interface ResetPassword {
    /**
     * @description The id of the reset password request
     * @type {string}
     */
    id: string;

    /**
     * @description The new password
     * @type {string}
     */
    password: string;

    /**
     * @description The id of the user that requests the reset
     * @type {string}
     */
    userId: string
}

/**
 * @enum
 * @description The response of the reset password get request
 */
export enum ResetPasswordGetRequestResponse {
    /**
     * @description The link is valid
     * @type {string}
     */
    VALID_LINK = 'VALID_LINK',

    /**
     * @description The link is expired
     * @type {string}
     */
    LINK_EXPIRED = 'LINK_EXPIRED',

    /**
     * @description The link is invalid
     * @type {string}
     */
    INVALID_LINK = 'INVALID_LINK'
}

/**
 * @interface
 * @description The response of the reset password get request
 */
export interface ResetPasswordGetRequest {
    /**
     * @description The response of the request
     * @type {ResetPasswordGetRequestResponse}
     */
    requestResponse: ResetPasswordGetRequestResponse,

    /**
     * @description The id of the user that requests the reset
     * @type {string}
     */
    userId: string   
}

export interface ResetPasswordGetRequestApiResponse extends ApiResponse {
    /**
     * @description The id of the user that requests the reset
     * @type {string}
     */
    userId: string
}

/**
 * @enum
 * @description The response of the reset password request
 */
export enum ResetPasswordResponse {
    /**
     * @description The password is invalid
     * @type {string}
     */
    INVALID_PASSWORD = 'INVALID_PASSWORD',

    /**
     * @description There is an internal server error
     * @type {string}
     */
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',

    /**
     * @description The password has already been used
     * @type {string}
     */
    ALREADY_USED_PASSWORD = 'ALREADY_USED_PASSWORD',

    /**
     * @description The password has been successfully modified
     * @type {string}
     */
    PASSWORD_SUCCESSFULLY_MODIFIED = 'PASSWORD_SUCCESSFULLY_MODIFIED'
}

export interface UserInfoApiResponse extends ApiResponse {
    /**
     * @description The user info
     * @type {UserInfo}
     */
    userInfo?: StringKeys<UserInfo>
}

/**
 * @interface
 * @description The user info
 */
export interface UserInfo {
    /**
     * @description The first name of the user
     * @type {string}
     */
    firstName: string,

    /**
     * @description The last name of the user
     * @type {string}
     */
    lastName: string,

    /**
     * @description The date of birth of the user
     * @type {Date}
     */
    language: Language
}

/**
 * @enum
 * @description The response of the token
 */
export enum TokenError {
    /**
     * @description No token has been provided
     * @type {string}
     */
    NO_TOKEN_PROVIDED = 'NO_TOKEN_PROVIDED',

    /**
     * @description The token is invalid
     */
    INVALID_TOKEN = 'INVALID_TOKEN'
}