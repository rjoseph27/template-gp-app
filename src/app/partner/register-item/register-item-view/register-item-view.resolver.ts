import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { PartnerRoutes } from "../../partner.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";

/**
 * @class PartnerRegisterItemViewResolver
 * @description The resolver for the partner register item view
 */
@Injectable()
export class PartnerRegisterItemViewResolver extends baseOrderDetailsResolver{  
  /** @inheritdoc */
  override redirectTo = PartnerRoutes.registerItem.fullPath();

  /** @inheritdoc */
  override getCurrency = async () => {
    const userSuccursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale;
    const succursaleByCountry = COUNTRY_INFO_LIST.map(x => ({
      country: x.name,
      regions: Array.from(x.succursales)
    }));
    const country = succursaleByCountry.find(x => x.regions.find(z => z[1].name === userSuccursale)).country
    return COUNTRY_INFO_LIST.find(c => c.name === country).currency;
  }
}