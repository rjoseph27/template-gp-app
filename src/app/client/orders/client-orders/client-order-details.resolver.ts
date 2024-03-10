import { Injectable } from "@angular/core";
import { ClientRoutes } from "../../../client.route";
import { baseOrderDetailsResolver } from "../base-order-details.resolver";

/**
 * @class ClientOrderDetailsResolver
 * @description The resolver for the client order details
 */
@Injectable()
export class ClientOrderDetailsResolver extends baseOrderDetailsResolver {
  /** @inheritdoc */
  override redirectTo = ClientRoutes.clientOrder.fullPath()
}