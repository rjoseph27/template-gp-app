import { Component } from "@angular/core";
import { TripStatus, baseOrdersComponent } from "../base-orders.component";
import { RequestTableElement } from "../../../core/layouts/orders/orders.component";
import { ClientRoutes } from "../../client.route";

/**
 * @class ClientTripListComponent
 * @description The trip list component
 */
@Component({
    selector: 'client-trip-list',
    templateUrl: './trip-list.component.html',
    styleUrls: ['../base-order.component.scss']
  })
  export class ClientTripListComponent extends baseOrdersComponent {
    /**
     * @description The non completed trips
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly nonCompletedTrips$ = this.requestsService.getTripList(this.userService.currentUserId).then(x => x.filter(y => y.status === TripStatus.PLANNED || y.status === TripStatus.CONFIRMED || y.status === TripStatus.ON_FLIGHT));

    /**
     * @description The completed trips
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly completedTrips$ = this.requestsService.getTripList(this.userService.currentUserId).then(x => x.filter(y => y.status === TripStatus.TRIP_DONE || y.status === TripStatus.CANCELED));

    /**
     * @description Redirect to the report trip page
     * @type {void}
     */
    protected goReportTripPage(): void {
      this.router.navigate([ClientRoutes.reportTrip.fullPath()]);
    }

    /**
     * @description Get the trips statuts
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly getStatusInfo = (row: RequestTableElement) => {
      switch (row.status) {
        case TripStatus.PLANNED:
          return {
            label: 'moduleList.gp.trip.status.planned',
            icon: 'calendar_month',
            action: () => this.router.navigate([ClientRoutes.plannedTrip.fullPath()], { queryParams: {
              id: row.id
            }})
          }
        case TripStatus.CONFIRMED:
          return {
            label: 'moduleList.gp.trip.status.confirmed',
            icon: 'check',
            action: () => this.router.navigate([ClientRoutes.confirmedTrip.fullPath()], { queryParams: {
              id: row.id
            }})
          }
        case TripStatus.ON_FLIGHT:
          return {
            label: 'moduleList.gp.trip.status.onFlight',
            icon: 'flightsmode',
            action: () => console.log("wait dispatch module")
          }
        case TripStatus.CANCELED:
          return {
            label: 'moduleList.gp.trip.status.cancel',
            icon: 'error',
            action: () => console.log("wait dispatch module")
          }
        case TripStatus.TRIP_DONE:
          return {
            label: 'moduleList.gp.trip.status.tripDone',
            icon: 'check_circle',
            action: () => this.router.navigate([ClientRoutes.tripDone.fullPath()], { queryParams: {
              id: row.id
            }})
          }
        default:
          return undefined;
      }
    }
  }