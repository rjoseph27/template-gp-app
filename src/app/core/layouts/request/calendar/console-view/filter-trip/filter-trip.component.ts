import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Country } from "../../../../../../misc/enums/country.enum";
import { CurrencyInfo } from "../../../../../../misc/constants/countries/countries.type";
import { COUNTRY_INFO_LIST } from "../../../../../../misc/constants/countries/countries";

/**
 * @interface FilterTripCaption
 * @description The captions of the filter trip component
 */
export interface FilterTripCaption {
    /**
     * @description The caption of the title of the page
     * @type {string}
     */
    title: string,

    /**
     * @description The caption of the filter field
     * @type {object}
     */
    filterField: {
        /**
         * @description The label of the filter field
         * @type {string}
         */
        label: string, 

        /**
         * @description The placeholder of the filter field
         * @type {string}
         */
        placeholder: string
    },
    /**
     * @description The caption of the remove button
     * @type {string}
     */
    remove: string,

    /**
     * @description The caption of the apply button
     * @type {string}
     */
    button: string
}

/**
 * @class GhFilterTripComponent
 * @description The filter trip component
 */
@Component({
  selector: 'gh-filter-trip',
  templateUrl: './filter-trip.component.html',
  styleUrl: './filter-trip.component.scss'
})
export class GhFilterTripComponent {
   /**
   * @description A method that close the console view
   * @returns void
   */
   @Output() readonly closed = new EventEmitter<void>();

   /**
    * @description An event emitter for the filter value
    * @type {EventEmitter<number>}
    */
   @Output() readonly filterValueChange = new EventEmitter<number>();

   /**
   * @description The input value
   * @type {number}
   */
   @Input() filterValue: number;

   /**
   * @description The captions of the filter trip component
   * @type {FilterTripCaption}
   */
   @Input() captions: FilterTripCaption;

   /**
    * @description The currency of the alert trip
    * @type {CurrencyInfo}
    */
   protected currency: CurrencyInfo;
   
   /**
    * @description The country of the alert trip
    * @type {Country}
    */
   @Input() set country(country: Country) {
      this.currency = COUNTRY_INFO_LIST.find(x => x.name === country).currency;
   }

   /**
    * @description A method that close the console view
    * @returns void
    */
   protected close(): void {
     this.closed.emit();
   }

   /**
    * @description A method that remove the filter
    * @returns void
    */
   protected removeFilter(): void {
      this.filterValueChange.emit(undefined);
      this.closed.emit();    
   }

   /**
    * @description A method that apply the filter
    * @returns void
    */
    protected applyFilter(): void {
        this.filterValueChange.emit(this.filterValue);
        this.closed.emit();
    }
}
