import { ItemInformation } from "../../core/layouts/request/item-information/item-information.component";
import { SpecificPrice, Unit } from "../../core/layouts/request/report-trip/report-trip.constant";
import { COUNTRY_INFO_LIST } from "../constants/countries/countries";
import { CurrencyInfo, SUCCURSALE_BY_COUNTRY } from "../constants/countries/countries.type";

/**
 * @interface PriceInfo
 * @description The information to calculate the price
 */
export interface PriceInfo {
    /**
     * @description The specific price
     * @type {SpecificPrice[]}
     */
    specificPrice: SpecificPrice[];

    /**
     * @description The default price
     * @type {number}
     */
    defaultPrice: number;
}
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
     * @description A method that calculates the price
     * @param order The item information
     * @param trip The report trip
     * @param rate The conversion rate
     * @returns {number}
     */
    static getPrice(order: ItemInformation, priceInfo: PriceInfo, rate: number, allOrders?: ItemInformation[]) {
        let price = 0;
        const category = priceInfo.specificPrice.find(x => x.category === order.itemCategory) 
        if(category) {
            if(category.unit === Unit.perItem) {
                price = order.itemWeight * category.price * order.itemQuantity;
            } else {
                price = category.price * order.itemQuantity;
            }
        } else {
            price = priceInfo.defaultPrice * order.itemWeight * order.itemQuantity;
        }

        if(allOrders)
        {
            const totalWeight = allOrders.reduce((acc, curr) => acc + curr.itemWeight, 0);
            if(totalWeight < 1) {
                price = priceInfo.defaultPrice;
            }
        }
        
        return price / rate;
    }

    /**
     * @description A method that calculates the total price
     * @param price The original price
     * @param rate The conversion rate
     * @returns {number}
     */
    static totalPrice(price: number, rate: number): number {
        if(rate !== 1) {
            price = MoneyUtil.addPercentage(price, CONVERSION_FEE)
        }
        price = MoneyUtil.addPercentage(price, GH_HUB_FEE);
        return Math.round(price);
    }

    /**
     * @description A method that gets the currency of a succursale
     * @param succursale The succursale
     * @returns {CurrencyInfo}
     */
    static getSuccursaleCurrency(succursale: string): CurrencyInfo {
          const country = SUCCURSALE_BY_COUNTRY.find(x => x.regions.find(z => z[1].name === succursale)).country
          return COUNTRY_INFO_LIST.find(c => c.name === country).currency;
    }
    
    /**
     * @description A method that calcultes the amount of money to withdraw
     * @param amount The amount to withdraw
     * @returns {number}
     */
    static withdrawMoneyAmount(amount: number): number {
        return amount - (amount * GH_HUB_FEE);
    }
}


/**
 * @constant
 * @description The GH hub fee
 */
const GH_HUB_FEE = MoneyUtil.toPercentage(10);

/**
 * @constant
 * @description The conversion fee
 */
const CONVERSION_FEE = MoneyUtil.toPercentage(2.5);