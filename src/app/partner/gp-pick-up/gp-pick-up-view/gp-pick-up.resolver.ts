import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { PartnerRoutes } from "../../partner.route";
import { MoneyUtil } from "../../../misc/util/money.util";
import { OrderDetails } from "../../../core/layouts/order-details/order-details.component";
import { CountryUtil } from "../../../misc/util/country.util";

/**
 * @class PartnerGpPickUpViewResolver
 * @description The resolver for the GP pick up view
 */
@Injectable()
export class PartnerGpPickUpViewResolver extends baseOrderDetailsResolver {  
  /** @inheritdoc */
  override redirectTo = PartnerRoutes.gpPickUp.fullPath();

  /** @inheritdoc */
  override getCurrency = async () => {
    const userSuccursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale;
    return MoneyUtil.getSuccursaleCurrency(userSuccursale);
  }

  /** @inheritdoc */
  override isUserOrder =  async (orderDetails: OrderDetails): Promise<boolean> => {
    const trip = await this.requestsService.getTripInfo(orderDetails.tripId);
    const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
    return CountryUtil.getSuccursaleByCity(CountryUtil.getCityByAirportCode(trip.userAirport)) === succursale
  };
}