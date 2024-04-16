import { Component, Input } from "@angular/core";
import { Currency } from "../../../misc/enums/currency.enum";
import { Country } from "../../../misc/enums/country.enum";
import { ItemInformation } from "../request/item-information/item-information.component";
import { SpecificPrice } from "../request/report-trip/report-trip.constant";
import { GhDateProperties } from "../../../misc/classes/gh-date";

/**
 * @interface OrderDetails
 * @description The order details
 */
export interface OrderDetails {
  /**
   * @description The arrival date of the trip
   * @type {GhDateProperties}
   */
  arrivalDate: GhDateProperties,

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
   * @type {GhDateProperties}
   */
  departureDate: GhDateProperties,

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
   * @type {GhDateProperties}
   */
  orderDate: GhDateProperties,

  /**
   * @description The send items id
   * @type {string}
   */
  itemGroupId: string,

  /**
   * @description The trip id
   * @type {string}
   */
  tripId: string,

  /**
   * @description The default price of the trip
   * @type {number}
   */
  defaultPrice: number,

  /**
   * @description The specific price of the trip
   * @type {SpecificPrice[]}
   */
  specificPrice: SpecificPrice[];

  /**
   * @description The total price of the trip
   * @type {number}
   */
  price?: number;

  /**
   * @description The user id
   * @type {string}
   */
  userId: string;
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
     * @description A boolean to show the price
     * @type {boolean}
     */
    @Input() showPrice: boolean = true;

    /**
     * @description The currency of the order
     * @type {Currency}
     */
    @Input() currency: Currency;

    /**
     * @description Transforms a GhDateProperties object into a Date object
     * @param date The date to transform
     * @returns {Date}
     */
    protected getDate(date: GhDateProperties): Date {
      return new Date(date.year, date.month, date.day);
    }
  }