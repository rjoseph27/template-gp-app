import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../../misc/base-class/base-order-details.resolver";
import { ClientRoutes } from "../../client.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { OrderDetails } from "../../../core/layouts/order-details/order-details.component";

/**
 * @class ClientGpOrderDetailsResolver
 * @description The resolver for the GP order details
 */
@Injectable()
export class ClientGpOrderDetailsResolver extends baseOrderDetailsResolver {
  /** @inheritdoc */
  override redirectTo = ClientRoutes.confirmOrders.fullPath()

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