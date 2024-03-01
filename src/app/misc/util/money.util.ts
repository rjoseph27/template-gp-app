/**
 * @class MoneyUtil
 * @description Util class for money related operations
 */
export class MoneyUtil {
    /**
     * @description A method that adds a percentage to the original amount
     * @param originalAmount The original amount
     * @param percentage The percentage to add
     * @returns {number}
     */
    static addPercentage(originalAmount: number, percentage: number): number {
        return originalAmount + (originalAmount * percentage);
    }

    /**
     * @description A method that converts a number to a percentage
     * @param originalAmount The original amount
     * @returns {number}
     */
    static toPercentage(originalAmount: number): number {
        return originalAmount / 100;
    }

    /**
     * @description A method that calculates the total price
     * @param price The original price
     * @param rate The conversion rate
     * @returns {number}
     */
    static totalPrice(price: number, rate: number): number {
        let total = price / rate;
        if(rate !== 1) {
            total = MoneyUtil.addPercentage(total, CONVERSION_FEE)
        }
        total = MoneyUtil.addPercentage(total, GH_HUB_FEE);
        return Math.round(total);
    }
}


/**
 * @constant
 * @description The GH hub fee
 */
const GH_HUB_FEE = MoneyUtil.toPercentage(8);

/**
 * @constant
 * @description The conversion fee
 */
const CONVERSION_FEE = MoneyUtil.toPercentage(2.5);