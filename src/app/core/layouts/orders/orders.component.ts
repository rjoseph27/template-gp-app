import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColumnConfig } from "../../elements/table/table.component";
import { Status } from "./status/status.component";

/**
 * @interface FlightRoute
 * @description The route of the flight
 */
interface FlightRoute {
  /**
   * @description The departure airport of the flight
   * @type {string}
   */
  from: string;

  /**
   * @description The arrival airport of the flight
   * @type {string}
   */
  to: string;
}


/**
 * @interface RequestTableElement
 * @description The element of the request table
 */
export interface RequestTableElement {
  /**
   * @description The id of the request
   * @type {string}
   */
  id: string;

  /**
   * @description The route of the request
   * @type {FlightRoute}
   */
  route: FlightRoute,

  /**
  * @description The delivery date of the request
  * @type {Date}
  */
  deliveryDate: Date;

  /**
   * @description The status of the request
   * @type {any}
   */
  status: any
}

/**
 * @constant ROUTE_ICON
 * @description The icon of the route
 */
const ROUTE_ICON = "connecting_airports"

/**
 * @class GhOrdersComponent
 * @description The layout for the requests
 */
@Component({
    selector: 'gh-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
  })
  export class GhOrdersComponent implements OnInit {
    /**
     * @description The id column of the request table
     * @type {string}
     */
    @Input() idColumn: string;

    /**
     * @description The label of the component
     * @type {string}
     */
    @Input() label: string;

    /**
     * @description The requests to be displayed
     * @type {RequestTableElement[]}
     */
    @Input() requests: RequestTableElement[];

    /**
     * @description Backing field for the request table columns
     * @type {BehaviorSubject<ColumnConfig[]>}
     */
    private readonly _requestTableColumns$ = new BehaviorSubject<ColumnConfig[]>(undefined);

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
     * @description The status template
     * @type {TemplateRef<any>}
     */
    @ViewChild('statusTemplate', { static: true }) statusTemplate: TemplateRef<any>;

    /**
   * @description The template for the empty table
   * @type {TemplateRef<any>}
   */
  @Input() emptyTemplate: TemplateRef<any>;

    /**
     * @description The icon of the route
     * @type {string}
     */
    protected readonly routeIcon = ROUTE_ICON;

    /**
     * @description The request table columns
     * @type {Observable<ColumnConfig[]>}
     */
    protected readonly requestTableColumns$ = this._requestTableColumns$.asObservable();

    /**
    * @description The function to get the status info
    * @type {(status: any) => Status}
    */
    @Input() getStatusInfo: (row: RequestTableElement) => Status;

    /** @inheritdoc */
    ngOnInit(): void {
        this._requestTableColumns$.next([
            {
              columnName: this.idColumn,
              valueAccessor: (row: RequestTableElement) => row.id.substring(0,5),
            },          
            {
              columnName: "global.request.table.route",
              valueAccessor: (row: RequestTableElement) => row.route,
              template: this.routeTemplate,
            },
            {
              columnName: "global.request.table.deliveryDate",
              valueAccessor: (row: RequestTableElement) => row.deliveryDate,
              template: this.deliveryDateTemplate,
            },
            {
              columnName: "global.request.table.status",
              valueAccessor: (row: RequestTableElement) => this.getStatusInfo(row),
              template: this.statusTemplate,
            },
          ])
    }
  }