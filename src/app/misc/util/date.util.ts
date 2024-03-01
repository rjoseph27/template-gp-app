/**
 * @interface DateFromDatePicker
 * @description An interface for the date from the date picker
 */
export interface DateFromDatePicker {
    /**
     * @description The date
     * @type {Date}
     */
    date: Date,
    
    /**
     * @description The date string
     * @type {string}
     */
    dateString: string,
}

/**
 * @class DateUtil
 * @description A utility class for date operations
 */
export class DateUtil {
    /**
     * @description The current date
     * @returns {Date} The current date
     */
    static today(): Date {
        return new Date();
    }

    /**
     * @description Subtracts years from a date
     * @param date The date to subtract years from
     * @param years The number of years to subtract
     * @returns The date with the years subtracted
     */
    static subtractYearsFromDate(date: Date, years: number): Date { 
        return new Date(date.getFullYear() - years, date.getMonth(), date.getDate()); 
    }

    /**
     * @description Adds years to a date
     * @param date The date to add date to
     * @param days The number od days to add
     * @returns {Date} The date with the days added
     */
    static addDaysFromDate(date: Date, days: number): Date { 
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days); 
    }

    /**
     * @description Adds months to a date
     * @param date The date to add months to
     * @param months The number of months to add
     * @returns {Date}
     */
    static addMonthFromDate(date: Date, months: number): Date { 
        return new Date(date.getFullYear(), date.getMonth() + months, date.getDate()); 
    }

    /**
     * @description Formats a date to a date picker string
     * @param date the date to format
     * @returns The formatted date
     */
    static formatToDatePicker(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}