import { DateFromDatePicker } from "../util/date.util";

/**
 * @interface GhDateProperties
 * @description The gh date properties
 */
export interface GhDateProperties {
    /**
     * @description The month
     * @type {number}
     */
    month: number,

    /**
     * @description The day
     * @type {number}
     */
    day: number,

    /**
     * @description The year
     * @type {number}
     */
    year: number,

    /**
     * @description The hour
     * @type {number}
     */
    hour?: number,

    /**
     * @description The minute
     * @type {number}
     */
    minute?: number,

    /**
     * @description The time zone
     * @type {number}
     */
    timeZone?: number
}

/**
 * @class GhDate
 * @description The gh date class
 */
export class GhDate {
    /**
     * @description The month
     * @type {number}
     */
    private month: number;

    /**
     * @description The day
     * @type {number}
     */
    private day: number;

    /**
     * @description The year
     * @type {number}
     */
    private year: number;

    /**
     * @description The hour
     * @type {number}
     */
    private hour: number;

    /**
     * @description The minute
     * @type {number}
     */
    private minute: number;

    /**
     * @description The time zone
     * @type {number}
     */
    private timeZone: number;

    /**
     * @constructor
     * @param date The date properties
     */
    constructor(date: GhDateProperties) {
        this.month = date.month;
        this.day = date.day;
        this.year = date.year;
        this.hour = date.hour || 0;
        this.minute = date.minute || 0;
        this.timeZone = this.timeZone || new Date().getTimezoneOffset();
    }

    /**
     * @description Creates a GhDate from a date
     * @param date The date
     * @returns {GhDate}
     */
    static fromDate(date: Date): GhDate {
        return new GhDate({
            month: date.getMonth(),
            day: date.getDate(),
            year: date.getFullYear(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            timeZone: date.getTimezoneOffset()
        });
    }

    /**
     * @description Sets the time
     * @param hour The hour
     * @param minute The minute
     * @returns {void}
     */
    setTime(hour: number, minute: number): void {
        this.hour = hour;
        this.minute = minute;
    }

    /**
     * @description Displays the date as a string
     * @returns {string}
     */
    toString(): string {
        return this.year+"/"+(this.month+1).toString().padStart(2, '0')+"/"+this.day.toString().padStart(2, '0')
    }

    /**
     * @description Sets the date relative to the current date
     * @param days The days to add or remove
     * @returns {void}
     */
    relativeSetDate(days: number): void {
        let date = new Date(this.year, this.month, this.day, this.hour, this.minute);
        date.setDate(date.getDate() + days);
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
    }

    /**
     * @description Sets the time relative to the current time
     * @param hours The hours to add or remove
     * @returns {void}
     */
    relativeSetTime(hours: number) {
        let date = new Date(this.year, this.month, this.day, this.hour, this.minute);
        date.setHours(date.getHours() + hours);
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
        this.hour = date.getHours();
        this.minute = date.getMinutes();
    }

    /**
     * @description Formats the gh date for the date picker
     * @returns {DateFromDatePicker}
     */
    formatFromDatePicker(): DateFromDatePicker {
        return {
            date: this.toJson(),
            dateString: this.toString(),
        };
    }
    

    /**
     * @description Converts the date to json
     * @returns {GhDateProperties}
     */
    toJson(): GhDateProperties {
        return {
            month: this.month,
            day: this.day,
            year: this.year,
            hour: this.hour,
            minute: this.minute,
            timeZone: this.timeZone
        }
    }

    /**
     * @description Gets the date
     * @returns {Date}
     */
    getDate(): Date {
        return new Date(this.year, this.month, this.day, this.hour, this.minute);
    }
  }