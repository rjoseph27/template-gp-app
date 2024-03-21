import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { PartnerRoutes } from "../../partner.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { MoneyUtil } from "../../../misc/util/money.util";

/**
 * @class PartnerRegisterItemViewResolver
 * @description The resolver for the partner register item view
 */
@Injectable()
export class PartnerRegisterItemViewResolver extends baseOrderDetailsResolver {  
  /** @inheritdoc */
  override redirectTo = PartnerRoutes.registerItem.fullPath();

  /** @inheritdoc */
  override getCurrency = async () => {
    const userSuccursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale;
    return MoneyUtil.getSuccursaleCurrency(userSuccursale);
  }
}