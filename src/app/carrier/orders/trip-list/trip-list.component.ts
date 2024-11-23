import { Component } from "@angular/core";
import { TripStatus, baseOrdersComponent } from "../base-orders.component";
import { RequestTableElement } from "../../../core/layouts/orders/orders.component";
import { CarrierRoutes } from "../../carrier.route";

/**
 * @class CarrierTripListComponent
 * @description The trip list component
 */
@Component({
    selector: 'carrier-trip-list',
    templateUrl: './trip-list.component.html',
    styleUrls: ['../base-order.component.scss']
  })
  export class CarrierTripListComponent extends baseOrdersComponent {
    /**
     * @description The non completed trips
     * @type {Observable<RequestTableElement[]>}
     */
    protected readonly nonCompletedTrips$ = this.requestsService.getTripList(this.userService.currentUserId).then(x => x.filter(y => y.status === TripStatus.PLANNED || y.status === TripStatus.CONFIRMED || y.status === TripStatus.ON_DELIVERY));

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
      this.router.navigate([CarrierRoutes.reportTrip.fullPath()]);
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
            action: () => this.router.navigate([CarrierRoutes.plannedTrip.fullPath()], { queryParams: {
              id: row.id
            }})
          }
        case TripStatus.CONFIRMED:
          return {
            label: 'moduleList.gp.trip.status.confirmed',
            icon: 'check',
            action: () => this.router.navigate([CarrierRoutes.confirmedTrip.fullPath()], { queryParams: {
              id: row.id
            }})
          }
        case TripStatus.ON_DELIVERY:
          return {
            label: 'moduleList.gp.trip.status.onDelivery',
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
            action: () => this.router.navigate([CarrierRoutes.tripDone.fullPath()], { queryParams: {
              id: row.id
            }})
          }
        default:
          return undefined;
      }
    }
  }