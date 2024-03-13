import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ItemCategory } from "../../../../misc/enums/item-category.enum";

/**
 * @enum
 * @description The unit of the specific price
 */
export enum Unit {
    /**
     * @description The price is per item
     * @type {string}
     */
    perItem = "perItem",
  
    /**
     * @description The price is per kg
     * @type {string}
     */
    perKg = "perKg", 
  }
  
  /**
   * @interface SpecificPrice
   * @description The specific price of a item
   */
 export interface SpecificPrice {
    /**
     * @description id of the item
     * @type {number}
     */
    id: number,
  
    /**
     * @description The category of the item
     * @type {ItemCategory}
     */
    category: ItemCategory,
  
    /**
     * @description The price of the item
     * @type {number}
     */
    price: number,
  
    /**
     * @description The unit of the item
     * @type {Unit}
     */
    unit: Unit,
  }
  
  /**
   * @constant
   * @description The icon for the empty table logo
   */
  export const EMPTY_TABLE_LOGO = "shoppingmode"
  
  /**
   * @constant
   * @description The name of the arrival time field
   */
  export const ARRIVAL_TIME = 'arrivalTime';
  
  /**
   * @constant
   * @description The name of the arrival date field
   */
  export const ARRIVAL_DATE = 'arrivalDate';
  
  /**
   * @constant
   * @description The name of the departure time field
   */
  export const DEPARTURE_TIME = 'departureTime';
  
  /**
   * @constant
   * @description The name of the departure date field
   */
  export const DEPARTURE_DATE = 'departureDate';
  
  /**
  * @constant
  * @description The name of the flight time validation
  */
  export const FLIGHT_TIME_INVALID = 'invalidFlightDate';

  /**
   * @constant
   * @description The name of the flight time validation
   */
  export const flighTimeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if(
        control.get(DEPARTURE_DATE).value && 
        control.get(DEPARTURE_TIME).value && 
        control.get(ARRIVAL_DATE).value && 
        control.get(ARRIVAL_TIME).value)
    {
        let departureDate = control.get(DEPARTURE_DATE).value.date;
        if(typeof departureDate === 'string') {
            departureDate = new Date(departureDate);
        }
        departureDate.setHours(control.get(DEPARTURE_TIME).value.time.hours);
        departureDate.setMinutes(control.get(DEPARTURE_TIME).value.time.minutes);
        let arrivalDate = control.get(ARRIVAL_DATE).value.date;
        if(typeof arrivalDate === 'string') {
          arrivalDate = new Date(arrivalDate);
      }
        arrivalDate?.setHours(control.get(ARRIVAL_TIME).value.time.hours);
        arrivalDate?.setMinutes(control.get(ARRIVAL_TIME).value.time.minutes);
  
       if (arrivalDate < departureDate) {
         control.get(ARRIVAL_TIME).setErrors({ invalidFlightDate: true });
          control.get(ARRIVAL_DATE).setErrors({ invalidFlightDate: true });
        } else {
          const arrivalTimeFieldErrors = { ...control.get(ARRIVAL_TIME).errors }; 
          delete arrivalTimeFieldErrors[FLIGHT_TIME_INVALID]; 
          control.get(ARRIVAL_TIME).setErrors(Object.keys(arrivalTimeFieldErrors).length ? arrivalTimeFieldErrors : null);

          const fromFieldErrors = { ...control.get(ARRIVAL_DATE).errors }; 
          delete fromFieldErrors[FLIGHT_TIME_INVALID]; 
          control.get(ARRIVAL_DATE).setErrors(Object.keys(fromFieldErrors).length ? fromFieldErrors : null);
      }
     }
      
    return null;
  };