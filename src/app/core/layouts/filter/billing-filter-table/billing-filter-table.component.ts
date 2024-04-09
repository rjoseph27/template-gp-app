import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColumnConfig } from "../../../elements/table/table.component";
import { BillingFilterInfo } from "../../../../api/requests/requests.type";
import { MoneyUtil } from "../../../../misc/util/money.util";
import { CurrencyService } from "../../../../services/currency.service";
import { Currency } from "../../../../misc/enums/currency.enum";

/**
 * @class GhBillingFilterTableComponent
 * @description The billing filter table component
 */
@Component({
    selector: 'gh-billing-filter-table',
    templateUrl: 'billing-filter-table.component.html',
    styleUrls: ['billing-filter-table.component.scss']
  })
  export class GhBillingFilterTableComponent implements OnInit {
    /**
     * @description The elements to display
     * @type {OrderFilterInfo[]}
     */
    @Input() elements: BillingFilterInfo[]

    /**
     * @description Whether the table has been filtered
     * @type {boolean}
     */
    @Input() hasBeenFiltered: boolean;

    /**
     * @description The currency of the user
     * @type {Currency}
     */
    @Input() currency: Currency

    /**
     * @description The view factory
     * @type {(row: BillingFilterInfo) => void}
     */
    @Input() viewFactory: (row: BillingFilterInfo) => void;

    /**
     * @description A boolean indicating if the full price should be shown
     * @type {boolean}
     */
    @Input() showFullPrice: boolean = true;

    /**
    * @description The currency service
    * @type {CurrencyService}
    */
    private readonly currencyService = inject(CurrencyService);

    /**
     * @description Backing field for the columns property
     * @type {BehaviorSubject<ColumnConfig[]>}
     */
    private readonly _columns$ = new BehaviorSubject<ColumnConfig[]>(undefined);

    /**
    * @description The route template
    * @type {TemplateRef<any>}
    */
    @ViewChild('routeTemplate', { static: true }) routeTemplate: TemplateRef<any>;

    /**
     * @description The price template
     * @type {TemplateRef<any>}
     */
    @ViewChild('priceTemplate', { static: true }) priceTemplate: TemplateRef<any>;
    
    /**
     * @description The columns to display
     * @type {ColumnConfig[]}
     */
    protected readonly columns$ = this._columns$.asObservable();

    /**
     * @description The selected elements change
     * @type {EventEmitter<OrderFilterInfo[]>}
     */
    @Output() selectedElementsChange = new EventEmitter<BillingFilterInfo[]>();

    /** @inheritdoc */
    async ngOnInit(): Promise<void> {
        const currency = await this.currencyService.getCurrency(this.currency);
        
        this._columns$.next([
          {
            columnName: 'orderFilter.table.header.email',
            valueAccessor: (row: BillingFilterInfo) => row.email
          },
          {
            columnName: 'orderFilter.table.header.orderNumber',
            valueAccessor: (row: BillingFilterInfo) => row.id
          },
          {
            columnName: 'orderFilter.table.header.route',
            valueAccessor: (row: BillingFilterInfo) => row.route,
            template: this.routeTemplate
          },
          {
            columnName: 'orderFilter.table.header.price',
            valueAccessor: (row: BillingFilterInfo) => {
                const price = Math.round(MoneyUtil.getPrice(row, {
                    specificPrice: row.specificPrice,
                    defaultPrice: row.defaultPrice
                }, currency[row.currency]));
                if(this.showFullPrice) {
                  return MoneyUtil.totalPrice(price, currency[row.currency])
                } else {
                  return price;
                }
            },
            template: this.priceTemplate
          },
        ])
      }
  }