import { ReportTrip } from "../../../../api/requests/requests.type";
import { Currency } from "../../../../misc/enums/currency.enum";

/**
 * @enum WeekDays
 * @description The week days
 */
export enum WeekDays {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday"
}

/**
 * @enum Month
 * @description The months
 */
export enum Month {
    January = "January",
    February = "February",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December"
}

/**
 * @interface TripInfo
 * @description The trip info
 */
export interface TripInfo {
    /**
     * @description The currency
     * @type {Currency}
     */
    currency: Currency,

    /**
     * @description The total price
     * @type {number}
     */
    totalPrice: number,

    /**
     * @description The trip
     * @type {ReportTrip}
     */
    trip: ReportTrip
}