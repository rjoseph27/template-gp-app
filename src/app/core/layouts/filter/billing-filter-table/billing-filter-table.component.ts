import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColumnConfig } from "../../../elements/table/table.component";
import { BillingFilterInfo } from "../../../../api/requests/requests.type";
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
     * @description The calculate price function
     * @type {(row: BillingFilterInfo) => void}
     */
    @Input() calculatePriceResolver: (row: BillingFilterInfo) => void;

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
            valueAccessor: (row: BillingFilterInfo) => this.calculatePriceResolver(row),
            template: this.priceTemplate
          },
        ])
      }
  }