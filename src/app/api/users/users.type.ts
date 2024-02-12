import { Country } from "../../misc/enums/country.enum";
import { Genders } from "../../misc/enums/genders.enum";

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