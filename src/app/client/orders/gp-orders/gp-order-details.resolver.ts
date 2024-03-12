import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../base-order-details.resolver";
import { ClientRoutes } from "../../../client.route";

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
}