import { Component, Input } from "@angular/core";

/**
 * @interface FlightRoute
 * @description The route of the flight
 */
export interface FlightRoute {
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
 * @constant ROUTE_ICON
 * @description The icon of the route
 */
const ROUTE_ICON = "connecting_airports"

/**
 * @class GhFlightRouteComponent
 * @description The layout for the flight route
 */
@Component({
    selector: 'gh-flight-route',
    templateUrl: 'flight-route.component.html',
    styleUrls: ['./flight-route.component.scss'],
  })
  export class GhFlightRouteComponent {
    /**
     * @description The icon of the route
     * @type {string}
     */
    protected readonly routeIcon = ROUTE_ICON;

    /**
     * @description The route of the flight
     * @type {FlightRoute}
     */
    @Input() route: FlightRoute;
  }