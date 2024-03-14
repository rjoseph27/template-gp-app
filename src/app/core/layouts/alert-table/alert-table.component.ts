import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColumnConfig } from "../../elements/table/table.component";
import { Currency } from "../../../misc/enums/currency.enum";
import { FlightRoute } from "../flight-route/flight-route.component";

/**
 * @interface AlertTableElement
 * @description The element of the alert table
 */
export interface AlertTableElement {
    /**
     * @description The id of the alert
     * @type {string}
     */
    id: string;
  
    /**
     * @description The item id of the alert
     * @type {string}
     */
    itemId: string;
  
    /**
     * @description The route of the alert
     * @type {FlightRoute}
     */
    route: FlightRoute;
  
    /**
     * @description The time range of the alert
     * @type {Object}
     */
    timeRange: {
      from?: Date;
      to?: Date;
    };
  
    /**
     * @description The max price of the alert
     * @type {number}
     */
    maxPrice: number;
  }

/**
 * @class GhAlertTableComponent
 * @description The layout for the alerts table
 */
@Component({
    selector: 'gh-alert-table',
    templateUrl: 'alert-table.component.html',
    styleUrls: ['./alert-table.component.scss'],
  })
  export class GhAlertTableComponent implements OnInit {
    /**
     * @description Backing field for the alert list table columns
     * @type {BehaviorSubject<ColumnConfig[]>}
     */
    private readonly _alertListTableColumns$ = new BehaviorSubject<ColumnConfig[]>(undefined);

    /**
    * @description The alert list table columns
    * @type {Observable<ColumnConfig[]>}
    */
    protected readonly alertListTableColumns$ = this._alertListTableColumns$.asObservable();
   
    /**
    * @description The currency of the user
    * @type {Currency}
    */
    @Input() currency: Currency
   
    /**
    * @description The alert list
    * @type {AlertTableElement[]}
    */
    @Input() alertList: AlertTableElement[];
   
    /**
    * @description The max price template
    * @type {TemplateRef<any>}
    */
    @ViewChild('maxPriceTemplate', { static: true }) maxPriceTemplate: TemplateRef<any>;
   
    /**
    * @description The time range template
    * @type {TemplateRef<any>}
    */
    @ViewChild('timeRangeTemplate', { static: true }) timeRangeTemplate: TemplateRef<any>;
   
    /**
    * @description The route template
    * @type {TemplateRef<any>}
    */
    @ViewChild('routeTemplate', { static: true }) routeTemplate: TemplateRef<any>;

    /**
     * @description The delete alert factory
     * @type {(element: AlertTableElement) => void}
     */
    @Input() deleteAlertFactory: (element: AlertTableElement) => void;

    /**
     * @description The edit alert factory
     * @type {(element: AlertTableElement) => void}
     */
    @Input() editAlertFactory: (element: AlertTableElement) => void;
   
    /** @inheritdoc */
    ngOnInit(): void {
        this._alertListTableColumns$.next([          
        {
            columnName: "global.alertList.table.route.name",
            valueAccessor: (row: AlertTableElement) => row.route,
            template: this.routeTemplate,
        },
        {
            columnName: "global.alertList.table.maxPrice.name",
            valueAccessor: (row: AlertTableElement) => row.maxPrice,
            template: this.maxPriceTemplate,
        },
        {
            columnName: "global.alertList.table.timeRange.name",
            valueAccessor: (row: AlertTableElement) => row.timeRange,
            template: this.timeRangeTemplate,
        },
        ])
    }
  }