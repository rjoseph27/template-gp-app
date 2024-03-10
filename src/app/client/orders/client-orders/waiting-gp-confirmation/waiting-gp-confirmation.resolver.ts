import { Injectable } from "@angular/core";
import { ClientRoutes } from "../../../../client.route";
import { baseOrderDetailsResolver } from "../../base-order-details.resolver";

/**
 * @class ClientWaitingGpConfirmationResolver
 * @description The resolver for the waiting gp confirmation component
 */
@Injectable()
export class ClientWaitingGpConfirmationResolver extends baseOrderDetailsResolver {
  /** @inheritdoc */
  override redirectTo = ClientRoutes.clientOrder.fullPath()
}