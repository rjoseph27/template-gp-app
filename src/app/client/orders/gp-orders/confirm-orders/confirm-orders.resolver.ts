import { Injectable } from "@angular/core";
import { baseOrderDetailsResolver } from "../../base-order-details.resolver";
import { ClientRoutes } from "../../../../client.route";

@Injectable()
export class ClientConfirmOrdersResolver extends baseOrderDetailsResolver {
  /** @inheritdoc */
  override redirectTo = ClientRoutes.confirmOrders.fullPath()

  /** @inheritdoc */
  override showTotalPrice: boolean = false;
}