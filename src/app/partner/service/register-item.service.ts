import { Injectable } from "@angular/core";
import { OrderDetails } from "../../core/layouts/order-details/order-details.component";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

/**
 * @class PartnerRegisterItemService
 * @description The service for the partner register item
 */
@Injectable()
export class PartnerRegisterItemService {
    /**
     * @description Backing field for current order details
     * @type {BehaviorSubject<OrderDetails>}
     */
    private readonly _currentOrderDetails$ = new BehaviorSubject<OrderDetails>(null); 

    /**
     * @description The current order details
     * @type {OrderDetails}
     */
    set currentOrderDetails(value: OrderDetails) {
        this._currentOrderDetails$.next(value);
    } 
    get currentOrderDetails(): OrderDetails {
        return this._currentOrderDetails$.getValue();
    }
}