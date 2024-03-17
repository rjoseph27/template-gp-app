import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColumnConfig } from "../../../elements/table/table.component";
import { OrderFilterInfo } from "../../../../api/requests/requests.type";
import { FlightRoute } from "../../flight-route/flight-route.component";

/**
 * @class GhOrderFilterTableComponent
 * @description The order filter table component
 */
@Component({
    selector: 'gh-order-filter-table',
    templateUrl: 'order-filter-table.component.html',
  })
  export class GhOrderFilterTableComponent implements OnInit {
    /**
     * @description The elements to display
     * @type {OrderFilterInfo[]}
     */
    @Input() elements: OrderFilterInfo[]

    /**
    * @description The route template
    * @type {TemplateRef<any>}
    */
    @ViewChild('routeTemplate', { static: true }) routeTemplate: TemplateRef<any>;

    /**
     * @description The delivery date template
     * @type {TemplateRef<any>}
     */
    @ViewChild('deliveryDateTemplate', { static: true }) deliveryDateTemplate: TemplateRef<any>;

    /**
     * @description Backing field for the columns property
     * @type {BehaviorSubject<ColumnConfig[]>}
     */
    private readonly _columns$ = new BehaviorSubject<ColumnConfig[]>(undefined);

    /**
     * @description The columns to display
     * @type {ColumnConfig[]}
     */
    protected readonly columns$ = this._columns$.asObservable();

    /** @inheritdoc */
    ngOnInit(): void {
      this._columns$.next([
        {
          columnName: 'orderFilter.table.header.email',
          valueAccessor: (row: OrderFilterInfo) => row.email
        },
        {
          columnName: 'orderFilter.table.header.orderNumber',
          valueAccessor: (row: OrderFilterInfo) => row.orderId
        },
        {
          columnName: 'orderFilter.table.header.route',
          valueAccessor: (row: OrderFilterInfo) => <FlightRoute>{
            from: row.originRegion,
            to: row.destinationRegion  
          },
          template: this.routeTemplate
        },
        {
          columnName: 'orderFilter.table.header.deliveryDate',
          valueAccessor: (row: OrderFilterInfo) => new Date(row.departureDate),
          template: this.deliveryDateTemplate
        }
      ])
    }
  }