import { Injectable } from "@angular/core";
import { ClientRoutes } from "../../../client.route";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";

/**
 * @class ClientOrderDetailsResolver
 * @description The resolver for the client order details
 */
@Injectable()
export class ClientOrderDetailsResolver extends baseOrderDetailsResolver {
  /** @inheritdoc */
  override redirectTo = ClientRoutes.clientOrder.fullPath()

  /** @inheritdoc */
  override getCurrency = async () => {
    const userCountry = (await this.userService.getUserInfo(this.userService.currentUserId)).country;
    return COUNTRY_INFO_LIST.find(country => country.name === userCountry).currency;
}
}