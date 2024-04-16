import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { PartnerRoutes } from "../../partner.route";
import { MoneyUtil } from "../../../misc/util/money.util";
import { OrderDetails } from "../../../core/layouts/order-details/order-details.component";
import { ItemsStatus } from "../../../client/orders/base-orders.component";
import { CountryUtil } from "../../../misc/util/country.util";
import { TrackingPointType } from "../../../core/layouts/tracking/tracking.type";

/**
 * @class PartnerCommissionItemViewResolver
 * @description The resolver for the partner commission item view
 */
@Injectable()
export class PartnerCommissionItemViewResolver extends baseOrderDetailsResolver {  
  /** @inheritdoc */
  override redirectTo = PartnerRoutes.commission.fullPath();

  /** @inheritdoc */
  override getCurrency = async () => {
    const userSuccursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale;
    return MoneyUtil.getSuccursaleCurrency(userSuccursale);
  }

  /** @inheritdoc */
  override isUserOrder =  async (orderDetails: OrderDetails): Promise<boolean> => {
    const trip = await this.requestsService.getTripInfo(orderDetails.tripId);
    const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
    const city = CountryUtil.getCityBySuccursale(succursale)
    const lastRedirect = [...trip.history].reverse().find(x => 
        x.location === city && 
        x.orderId === orderDetails.itemInformation.id.toString() &&
        x.type === TrackingPointType.REDIRECT
    )
    return orderDetails.itemInformation.status === ItemsStatus.REDIRECT && !!lastRedirect
  };
}