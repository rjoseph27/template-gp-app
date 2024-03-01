import { Injectable } from "@angular/core";
import { BaseServiceApi } from "../base.service.api";
import { firstValue } from "../../misc/function/firstValue";
import { Currency } from "../../misc/enums/currency.enum";

/**
 * @interface CurrencyApiResponse
 * @description The currency api response
 */
interface CurrencyApiResponse {
    /**
     * @description The currency
     * @type {Currency}
     */
    base: string;

    /**
     * @description List of all the rates
     * @type {any}
     */
    rate: any;
}
/**
 * @class CurrencyServiceApi
 * @description The currency service api
 */
@Injectable()
export class CurrencyServiceApi extends BaseServiceApi {
    /** @inheritdoc */
    override apiName: string = 'currency';

    /**
     * @description A method that gets the currencies
     * @param currency The base currency
     * @returns {Promise<CurrencyApiResponse>}
     */
    getCurrency(currency: Currency): Promise<CurrencyApiResponse> {
        return firstValue(this.getRequest<CurrencyApiResponse>('rate', currency));
    }
}