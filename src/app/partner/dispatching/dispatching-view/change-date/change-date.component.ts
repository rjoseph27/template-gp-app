import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";
import { FormMode } from "../../../../misc/enums/form-mode.enum";
import { CurrentFormService } from "../../../../services/current-form.service";
import { Layovers } from "../../../../core/layouts/request/create-layover/create-layover.component";
import { ClientRequestsService } from "../../../../client/service/requests.service";
import { PartnerRoutes } from "../../../partner.route";

/**
 * @class PartnerChangeDateComponent
 * @description The partner change date component
 */
@Component({
    selector: 'partner-change-date',
    templateUrl: './change-date.component.html',
    styleUrls: ['./change-date.component.scss'],
    providers: [CurrentFormService]
  })
  export class PartnerChangeDateComponent{
    /**
     * @description The activated route
     * @type {ActivatedRoute}
     */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description The current form service
     * @type {CurrentFormService}
     */
    private readonly currentFormService: CurrentFormService = inject(CurrentFormService);
    
    /**
     * @description The details of the trip
     * @type {Observable<ReportTrip>}
     */
    protected readonly tripDetails$ = this.route.data.pipe(map(data => data['trip']))

    /**
     * @description The country of the succursale
     * @type {Observable<string>}
     */
    protected readonly country$ = this.tripDetails$.pipe(map(trip => trip.userCountry));

    /**
     * @description The departure date of the trip
     * @type {Observable<Date>}
     */
    protected readonly departureDate$ = this.tripDetails$.pipe(map(trip => {
      const date = new Date(trip.departureDate.dateString)
      date.setHours(trip.departureTime.time.hours);
      date.setMinutes(trip.departureTime.time.minutes);
      return date;
    }));

    /**
    * @description The arrival date of the trip
    * @type {Observable<Date>}
    */
    protected readonly arrivalDate$ = this.tripDetails$.pipe(map(trip => {
      const date = new Date(trip.arrivalDate.dateString)
      date.setHours(trip.arrivalTime.time.hours);
      date.setMinutes(trip.arrivalTime.time.minutes);
      return date;
  } ));

    /**
     * @description The form
     * @type {FormGroup}
     */
    protected get form() {
      return this.currentFormService.currentForm
    }

    /**
     * @description The origin airport
     * @type {Observable<string>}
     */
    protected readonly originAirport$ = this.tripDetails$.pipe(map(trip => trip.userAirport));

    /**
     * @description The destination airport
     * @type {Observable<string>}
     */
    protected readonly destinationAirport$ = this.tripDetails$.pipe(map(trip => trip.destinationAirport));

    /**
     * @description The layovers
     * @type {Observable<Layovers>}
     */
    protected readonly layovers$ = this.tripDetails$.pipe(map(trip => trip.layovers));

    /**
     * @description The backing field for the loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _loading$ = new BehaviorSubject<boolean>(false);
    
    /**
     * @description An observable for the loading
     * @type {Observable<boolean>}
     */
    protected readonly loading$ = this._loading$.asObservable();

    /**
     * @description The angular router service.
     * @type {Router}
     */
    private readonly router = inject(Router);

    /**
     * @description The form mode for template use
     * @type {FormMode}
     */
    protected readonly formMode = FormMode;

    /**
     * @description The requests service
     * @type {ClientRequestsService}
     */
    private readonly requestsService = inject(ClientRequestsService); 

    protected modifyItinerary() {
      this._loading$.next(true);
      this.requestsService.editTripItinerary({...this.currentFormService.currentForm.value, id: this.route.snapshot.data['trip'].id}).then(x => {
        this._loading$.next(false);
        this.router.navigate([PartnerRoutes.dispatchingView.fullPath()], { queryParams: this.route.snapshot.queryParams })
      });
    }
  }