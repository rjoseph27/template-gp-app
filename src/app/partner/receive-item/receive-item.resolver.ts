import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../misc/base-class/base-order-details.resolver";
import { PartnerRoutes } from "../partner.route";
import { MoneyUtil } from "../../misc/util/money.util";
import { CountryUtil } from "../../misc/util/country.util";
import { OrderDetails } from "../../core/layouts/order-details/order-details.component";
import { SUCCURSALE_BY_COUNTRY } from "../../misc/constants/countries/countries.type";

/**
 * @class PartnerReceiveItemViewResolver
 * @description The resolver for the partner receive item view
 */
@Injectable()
export class PartnerReceiveItemViewResolver extends baseOrderDetailsResolver {  
  /** @inheritdoc */
  override redirectTo = PartnerRoutes.receiveItem.fullPath();

  /** @inheritdoc */
  override showTotalPrice = false;

  /** @inheritdoc */
  override getCurrency = async () => {
    const userSuccursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale;
    return MoneyUtil.getSuccursaleCurrency(userSuccursale);
  }

  /** @inheritdoc */
  override isUserOrder =  async (orderDetails: OrderDetails): Promise<boolean> => {
    const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
    const succursaleCountry = CountryUtil.getCountryBySuccursale(succursale);
    return orderDetails.destinationCountry === succursaleCountry
  };
}