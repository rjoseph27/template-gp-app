import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { OrderDetails } from "../../../core/layouts/order-details/order-details.component";
import { CarrierRoutes } from "../../carrier.route";

/**
 * @class CarrierOrderDetailsResolver
 * @description The resolver for the carrier order details
 */
@Injectable()
export class CarrierOrderDetailsResolver extends baseOrderDetailsResolver {
  /** @inheritdoc */
  override redirectTo = CarrierRoutes.confirmOrders.fullPath()

  /** @inheritdoc */
  override showTotalPrice: boolean = false;

  /** @inheritdoc */
  override getCurrency = async () => {
        const userCountry = (await this.userService.getUserInfo(this.userService.currentUserId)).country;
        return COUNTRY_INFO_LIST.find(country => country.name === userCountry).currency;
  }

  /** @inheritdoc */
  override isUserOrder =  async (orderDetails: OrderDetails): Promise<boolean> => {
    const trip = await this.requestsService.getTripInfo(orderDetails.tripId);
    return trip.userId === this.userService.currentUserId;
  };
}