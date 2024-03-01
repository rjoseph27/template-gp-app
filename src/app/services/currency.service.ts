import { Injectable, inject } from "@angular/core";
import { CurrencyServiceApi } from "../api/currency/currency.service.api";
import { Currency } from "../misc/enums/currency.enum";

/**
 * @class CurrencyService
 * @description The currency service
 */
@Injectable()
export class CurrencyService {
    /**
     * @description The currency service api
     * @type {CurrencyServiceApi}
     */
    private readonly currencyServiceApi: CurrencyServiceApi = inject(CurrencyServiceApi);

    /**
     * @description A method that gets the currency
     * @param currency The currency
     * @returns {Promise<any>}
     */
    getCurrency(currency: Currency): Promise<any> {
        return this.currencyServiceApi.getCurrency(currency);
    }
}