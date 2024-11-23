import { Injectable, inject } from '@angular/core';
import { RequestsServiceApi } from '../../api/requests/requests.service.api';
import {
  ItemsOrdersStatus,
  ReportTrip,
  ReportTripStatus,
  GetReportTripStatus,
  CancelTripStatus,
  AddHistoryStatus,
} from '../../api/requests/requests.type';
import { UsersService } from '../../services/users.service';
import { RequestTableElement } from '../../core/layouts/orders/orders.component';
import { TrackingPoint } from '../../core/layouts/tracking/tracking.type';

/**
 * @class RequestsService
 * @description The requests service
 */
@Injectable()
export class CarrierRequestsService {
  /**
   * @description The requests service api
   * @type {RequestsServiceApi}
   */
  private readonly requestsServiceApi: RequestsServiceApi =
    inject(RequestsServiceApi);

  /**
   * @description Reports a trip
   * @param reportTrip The report trip request
   * @returns {Promise<boolean>} A promise that resolves to true if the trip was reported successfully, false otherwise
   */
  reportTrip(reportTrip: ReportTrip): Promise<boolean> {
    return this.requestsServiceApi.reportTrip(reportTrip).then((msg) => {
      if (msg.message === ReportTripStatus.TRIP_REPORTED_SUCCESSFULLY) {
        return true;
      }
      return false;
    });
  }

  /**
   * @description Gets the items orders for a user
   * @param userId The id of the user
   * @returns {Promise<RequestTableElement[]>} A promise that resolves to the items orders
   */
  getItemsOrdersForGp(userId: string): Promise<RequestTableElement[]> {
    return this.requestsServiceApi.getItemsOrdersForGp(userId).then((msg) => {
      if (msg.message === ItemsOrdersStatus.ITEMS_FOUND) {
        return msg.orders || [];
      } else {
        return [];
      }
    });
  }

  /**
   * @description Gets the trip list
   * @param userId The id of the user
   * @returns {Promise<ReportTrip[]>} A promise that resolves to the trip list
   */
  getTripList(userId: string): Promise<RequestTableElement[]> {
    return this.requestsServiceApi.getTripList(userId).then((msg) => {
      if (msg.message === GetReportTripStatus.TRIPS_FOUND) {
        return msg.trips;
      }
      return [];
    });
  }

  /**
   * @description Cancels a trip
   * @param tripId The trip id
   * @returns {Promise<boolean>} A promise that resolves to true if the trip was canceled successfully, false otherwise
   */
  cancelTrip(tripId: string): Promise<boolean> {
    return this.requestsServiceApi.gpCancelTrip({ tripId }).then((msg) => {
      if (msg.message === CancelTripStatus.TRIP_CANCELED_SUCCESSFULLY) {
        return true;
      }
      return false;
    });
  }

  /**
   * @description Adds a history
   * @param history The history to add
   * @returns {Promise<boolean>} A promise that resolves to true if the history was added successfully, false otherwise
   */
  addHistory(history: TrackingPoint): Promise<boolean> {
    return this.requestsServiceApi.addHistory(history).then((msg) => {
      if (msg.message === AddHistoryStatus.HISTORY_ADDED_SUCCESSFULLY) {
        return true;
      }
      return false;
    });
  }
}
