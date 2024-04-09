import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { PartnerRoutes } from "../../partner.route";
import { MoneyUtil } from "../../../misc/util/money.util";
import { CountryUtil } from "../../../misc/util/country.util";
import { OrderDetails } from "../../../core/layouts/order-details/order-details.component";

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

  /** @inheritdoc */
  override isUserOrder =  async (orderDetails: OrderDetails): Promise<boolean> => {
    const trip = await this.requestsService.getTripInfo(orderDetails.tripId);
    const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
    return CountryUtil.getSuccursaleByAirportCode(trip.userAirport) === succursale
  };
}