import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { ReportTrip } from "../../../../../../api/requests/requests.type";
import { ClientSendItemsService } from "../../../../../../client/service/send-items.service";
import { BehaviorSubject } from "rxjs";
import { ClientRequestsService } from "../../../../../../client/service/requests.service";

/**
 * @interface SelectTripCaption
 * @description The captions of the select trip component
 */
export interface SelectTripCaption {
  /**
   * @description The title of the page
   * @type {string}
   */
  title: string,

  /**
   * @description The departure caption
   * @type {string}
   */
  departure: string,

  /**
   * @description The arrival caption
   * @type {string}
   */
  arrival: string,

  /**
   * @description The total caption
   * @type {string}
   */
  total: string,

  /**
   * @description The button caption
   * @type {string}
   */
  select: string,

  /**
   * @description The confirm section caption
   * @type {string}
   */
  confirm: {
    /**
     * @description The title of the page
     * @type {string}
     */
    title: string,

    /**
     * @description The content of the page
     * @type {string}
     */
    content: string,

    /**
     * @description The button caption
     * @type {string}
     */
    button: string
  }
}

/**
 * @class GhSelectTripComponent
 * @description The select trip component
 */
@Component({
  selector: 'gh-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrl: './select-trip.component.scss'
})
export class GhSelectTripComponent {
  /**
   * @description The selected trip
   * @type {ReportTrip}
   */
  @Input() selectedTrip: ReportTrip

  /**
   * @description The total price
   * @type {number}
   */
  @Input() totalPrice: number;

  /**
   * @description The captions of the page
   * @type {SelectTripCaption}
   */
  @Input() captions: SelectTripCaption;

  /**
   * @description A method that close the console view
   * @returns void
   */
  @Output() readonly closed = new EventEmitter<void>();

  /**
   * @description The backing field for the isConfirmed observable
   * @type {BehaviorSubject<boolean>}
   */
  private readonly _isConfirmed$ = new BehaviorSubject<boolean>(false);

  /**
   * @description An observable for the confirmation state
   * @type {Observable<boolean>}
   */
  protected readonly isConfirmed$ = this._isConfirmed$.asObservable();

  /**
   * @description A method that close the console view
   * @returns void
   */
  protected close(): void {
    this.closed.emit();
  }

  /**
   * @description The send items service
   * @type {ClientSendItemsService}
   */
  private readonly sendItemsService = inject(ClientSendItemsService);

  /**
   * @description The requests service
   * @type {ClientRequestsService}
   */
  private readonly requestsService = inject(ClientRequestsService);

  /**
   * @description The currency
   * @type {string}
   */
  protected readonly currency = this.sendItemsService.requests.currency

  /**
   * @description The backing field for the sendingDataServer observable
   * @type {BehaviorSubject<boolean>}
   */
  private readonly _sendingDataServer$ = new BehaviorSubject<boolean>(false);

  /**
   * @description An observable that indicates if the data is sending to the server
   * @type {Observable<boolean>}
   */
  protected readonly sendingDataServer$ = this._sendingDataServer$.asObservable();

  /**
   * @description Confirm the trip
   * @returns void
   */
  protected confirm(): void {
    this._sendingDataServer$.next(true);
    this.requestsService.sendItems({ items: this.sendItemsService.requests, tripId: this.selectedTrip.id }).then(success => {
      if(success) {
        this._isConfirmed$.next(true);
        this.sendItemsService.requests = null;
      }
    })
  }

  /**
   * @description Redirect to the my orders page
   * @returns void
   */
  protected seeMyOrders(): void {
    console.log("TODO: Redirect to orders page")
  }
}
