import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DateFromDatePicker, DateUtil } from "../../../../../../misc/util/date.util";
import { BehaviorSubject } from "rxjs";
import { CurrencyInfo } from "../../../../../../misc/constants/countries/countries.type";
import { Country } from "../../../../../../misc/enums/country.enum";
import { COUNTRY_INFO_LIST } from "../../../../../../misc/constants/countries/countries";
import { ClientRequestsService } from "../../../../../../client/service/requests.service";
import { ClientSendItemsService } from "../../../../../../client/service/send-items.service";
import { Router } from "@angular/router";
import { ClientRoutes } from "../../../../../../client/client.route";
import { CurrentFormService } from "../../../../../../services/current-form.service";
import { GhDate } from "../../../../../../misc/classes/gh-date";

/**
 * @interface AlertTripCaptions
 * @description The alert trip captions
 */
export interface AlertTripCaptions {
  /**
   * @description The title of the alert trip
   * @type {string}
   */
  title: string,

  /**
   * @description The alert sent
   * @type {Object}
   */
  alertSent: {
    /**
     * @description The content of the alert sent
     * @type {string}
     */
    content: string,

    /**
     * @description The caption of the button to redirect to the alert page
     * @type {string}
     */
    button: string
  },

  /**
   * @description The caption of the submit button
   */
  button: string
}

/**
 * @class GhAlertTripComponent
 * @description The alert trip component
 */
@Component({
  selector: 'gh-alert-trip',
  templateUrl: './alert-trip.component.html',
  styleUrl: './alert-trip.component.scss',
  providers: [CurrentFormService]
})
export class GhAlertTripComponent {
   /**
   * @description A method that close the console view
   * @returns void
   */
   @Output() readonly closed = new EventEmitter<void>();

   /**
    * @description The captions of the alert trip
    * @type {AlertTripCaptions}
    */
   @Input() captions: AlertTripCaptions;

   /**
    * @description The default date of the alert view
    * @type {DateFromDatePicker}
    */
   protected defaultDate: DateFromDatePicker;

   /**
   * @description The backing field for alertSent$
   * @type {BehaviorSubject<boolean>}
   */
   private readonly _alertSent$ = new BehaviorSubject<boolean>(false);

   /**
   * @description An observable that indicates if the alert was sent
   * @type {Observable<boolean>}
   */
   protected readonly alertSent$ = this._alertSent$.asObservable();

   /**
    * @description The selected date
    * @type {Date}
    */
   @Input() set selectedDate(value: Date) {
    const date = GhDate.fromDate(value);
    if(value) {
      this.defaultDate = {
        date: date.toJson(),
        dateString: DateUtil.formatToDatePicker(value)
      };
    }
   }

   /**
    * @description The currency of the alert trip
    * @type {CurrencyInfo}
    */
   protected currency: CurrencyInfo;
   
   /**
    * @description The country of the alert trip
    * @type {Country}
    */
   @Input() set country(country: Country) {
      this.currency = COUNTRY_INFO_LIST.find(x => x.name === country).currency;
   }

   /**
    * @description The backing field for loading$
    * @type {BehaviorSubject<boolean>}
    */
   private readonly _loading$ = new BehaviorSubject<boolean>(false);

   /**
   * @description An observable that emits the loading state of the component
   * @type {Observable<boolean>}
   */
   protected readonly loading$ = this._loading$.asObservable();

  /**
   * @description The requests service
   * @type {ClientRequestsService}
   */
  private readonly requestsService = inject(ClientRequestsService);

  /**
   * @description The send items service
   * @type {ClientSendItemsService}
   */
  private readonly sendItemsService = inject(ClientSendItemsService);

   /**
    * @description The alert form
    * @type {FormGroup}
    */
   protected get alertForm(): FormGroup {
    return this.currentFormService.currentForm;
  }

   /**
   * @description The angular router service.
   * @type {Router}
   */
  private readonly router: Router = inject(Router);

   /**
    * @description A method that close the console view
    * @returns void
    */
   protected close(): void {
     this.closed.emit();
   }

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
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

   /**
   * @description A method that create an alert
   * @returns void
   */
   protected createAlert(): void{
    this._loading$.next(true);
    this.requestsService.createAlert({...this.currentFormService.currentForm.value, route: {
      from: this.sendItemsService.requests.userRegion,
      to: this.sendItemsService.requests.destinationRegion
    }, items: this.sendItemsService.requests}).then(res => {
      this._loading$.next(false);
      if(res) {
        this._alertSent$.next(true);
      }
    })
   }

   /**
   * @description A method that go to the alert page
   * @returns void
   */
   protected goAlertPage() {
     this.router.navigate([ClientRoutes.alertList.fullPath()]);
   }
}
