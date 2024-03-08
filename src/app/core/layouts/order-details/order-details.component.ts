import { Component, Input } from "@angular/core";
import { Currency } from "../../../misc/enums/currency.enum";
import { Country } from "../../../misc/enums/country.enum";
import { ItemInformation } from "../request/item-information/item-information.component";

/**
 * @interface OrderDetails
 * @description The order details
 */
export interface OrderDetails {
  /**
   * @description The arrival date of the trip
   * @type {Date}
   */
  arrivalDate: Date,

  /**
   * @description The arrival time of the trip
   * @type {string}
   */
  arrivalTime: string,

  /**
  * @description The currency of the GP
  * @type {Currency}
  */
  currency: Currency,

  /**
   * @description The departure date of the trip
   * @type {Date}
   */
  departureDate: Date,

  /**
   * @description The departure time of the trip
   * @type {string}
   */
  departureTime: string,

  /**
   * @description The destination country of the trip
   * @type {Country}
   */
  destinationCountry: Country,

  /**
   * @description The destination region of the trip
   * @type {any}
   */
  destinationRegion: any,

  /**
   * @description The origin country of the trip
   * @type {Country}
   */
  originCountry: Country,

  /**
   * @description The origin region of the trip
   * @type {any}
   */
  originRegion: any,

  /**
   * @description The item information
   * @type {ItemInformation}
   */
  itemInformation: ItemInformation,

  /**
   * @description The order date
   * @type {Date}
   */
  orderDate: Date,

  /**
   * @description The total price of the order
   * @type {number}
   */
  price: number,
}

/**
 * @class GhOrderDetailsComponent
 * @description The order details component
 */
@Component({
    selector: 'gh-order-details',
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.scss'
  })
  export class GhOrderDetailsComponent {
    /**
     * @description The order details
     * @type {OrderDetails}
     */
    @Input() orderDetails: OrderDetails;

    /**
     * @description The currency of the order
     * @type {Currency}
     */
    @Input() currency: Currency;
  }