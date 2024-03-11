import { inject } from "@angular/core";
import { ClientRequestsService } from "../service/requests.service";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";

/**
 * @enum ItemsStatus
 * @description The items status
 */
export enum ItemsStatus {
    /**
     * @description The items are waiting for confirmation of the GP
     * @type {string}
     */
    WAIT_CONFIRMATION = 'WAIT_CONFIRMATION',
  
    /**
     * @description The items are on a alert to find a GP
     * @type {string}
     */
    ON_ALERT = 'ON_ALERT',
  
    /**
     * @description The items are canceled by the client
     * @type {string}
     */
    CANCELED_BY_CLIENT = 'CANCELED_BY_CLIENT',
  
    /**
     * @description The items are canceled by the GP
     * @type {string}
     */
    CANCELED_BY_GP = 'CANCELED_BY_GP',
  
    /**
     * @description The clients need to send the items to the checkpoint
     * @type {string}
     */
    WAITING_RECEPTION = 'WAITING_RECEPTION',
  
    /**
     * @description The items are at the checkpoint
     * @type {string}
     */
    AT_CHECKPOINT = 'AT_CHECKPOINT',

    /**
     * @description The items are ready to be picked up by the GP
     * @type {string}
     */
    READY_TO_PICK_UP = 'READY_TO_PICK_UP',

    /**
     * @description The items are in the possession of the GP
     * @type {string}
     */
    WITH_GP = 'WITH_GP',
  
    /**
     * @description The items are on the way to the final destination
     * @type {string}
     */
    ON_DELIVERY = 'ON_DELIVERY',
  
    /**
     * @description The items had an exception during the delivery
     * @type {string}
     */
    EXCEPTION = 'EXCEPTION',
  
    /**
     * @description The items are at the final checkpoint
     * @type {string}
     */
    FINAL_CHECKPOINT = 'FINAL_CHECKPOINT',
  
    /**
     * @description The items has been delivered
     * @type {string}
     */
    DELIVERED = 'DELIVERED',
  }

/**
 * @class baseOrdersComponent
 * @description The base class for the orders
 */
export abstract class baseOrdersComponent {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    protected readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The users service
    * @type {UsersService}
    */
    protected readonly userService: UsersService = inject(UsersService);
    
    /**
    * @description The angular router service.
    * @type {Router}
    */
    protected readonly router: Router = inject(Router);
}
