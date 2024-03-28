import { AfterContentChecked, ChangeDetectorRef, Component, inject } from "@angular/core";
import { CurrentFormService } from "../../../../services/current-form.service";
import { ModalService } from "../../../../services/modal.service";
import { ActivatedRoute } from "@angular/router";
import { ReportTrip } from "../../../../api/requests/requests.type";
import { BehaviorSubject, Observable, map } from "rxjs";
import { FormMode } from "../../../../misc/enums/form-mode.enum";
import { SUCCURSALE_BY_COUNTRY } from "../../../../misc/constants/countries/countries.type";
import { NotificationService } from "../../../../services/notification.service";
import { ClientRequestsService } from "../../../../client/service/requests.service";
import { NavigationService } from "../../../../services/navigation.service";

@Component({
    selector: 'partner-confirm-trip',
    templateUrl: './confirm-trip.component.html',
    styleUrls: ['./confirm-trip.component.scss'],
    providers: [ModalService, CurrentFormService]
  })
  export class PartnerConfirmTripComponent implements AfterContentChecked {
    /**
     * @description The activated route
     * @type {ActivatedRoute}
     */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description The backing field for cancel loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _cancelLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description The loading state of the cancel button
     * @type {Observable<boolean>}
     */
    protected readonly cancelLoading$ = this._cancelLoading$.asObservable();

    /**
     * @description The backing field for confirm loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _confirmLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description The loading state of the confirm button
     * @type {Observable<boolean>}
     */
    protected readonly confirmLoading$ = this._confirmLoading$.asObservable();
    
    /**
     * @description The details of the trip
     * @type {Observable<ReportTrip>}
     */
    protected readonly tripDetail$: Observable<ReportTrip> = this.route.data.pipe(map(data => data['trip']));

    /**
     * @description The departure date of the trip
     * @type {Observable<Date>}
     */
    protected readonly departureDate$ = this.tripDetail$.pipe(map(trip => {
        const date = new Date(trip.departureDate.dateString)
        date.setHours(trip.departureTime.time.hours);
        date.setMinutes(trip.departureTime.time.minutes);
        return date;
    }));

    /**
     * @description The arrival date of the trip
     * @type {Observable<Date>}
     */
    protected readonly arrivalDate$ = this.tripDetail$.pipe(map(trip => {
        const date = new Date(trip.arrivalDate.dateString)
        date.setHours(trip.arrivalTime.time.hours);
        date.setMinutes(trip.arrivalTime.time.minutes);
        return date;
    }));

    /**
    * @description The country of the user
    * @type {string}
    */
    protected readonly userCountry = SUCCURSALE_BY_COUNTRY.find(x => x.regions.find(z => z[1].name === this.route.snapshot.data['userInfo'].succursale)).country;

    /**
     * @description The origin airport
     * @type {Observable<string>}
     */
    protected readonly originAirport$ = this.tripDetail$.pipe(map(trip => trip.userAirport));

    /**
     * @description The destination airport
     * @type {Observable<string>}
     */
    protected readonly destinationAirport$ = this.tripDetail$.pipe(map(trip => trip.destinationAirport));

    /**
     * @description The form mode for template use
     * @type {FormMode}
     */
    protected readonly formMode = FormMode;

    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * @description The current form service
     * @type {CurrentFormService}
     */
    private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

    /**
     * @description The notification service
     * @type {NotificationService}
     */
    private readonly notificationService: NotificationService = inject(NotificationService);

    /**
     * @description The modal service
     * @type {ModalService}
     */
    protected readonly modalService: ModalService = inject(ModalService);

    /**
     * @description The current form
     * @type {FormGroup}
     */
    protected get form() {
        return this.currentFormService.currentForm;
    }

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The navigation service
    * @type {NavigationService}
    */
    private readonly navigationService: NavigationService = inject(NavigationService);

    /**
     * @description The method to confirm the trip
     * @returns void
     */
    protected confirm() {
        this.modalService.openModal({
            title: "moduleList.dispatching.view.confirm.modal.title",
            text: "moduleList.dispatching.view.confirm.modal.content",
            confirmCaption: "moduleList.dispatching.view.confirm.modal.confirm",
            cancelCaption: "moduleList.dispatching.view.confirm.modal.cancel"
          }).then(async x => {
            this._confirmLoading$.next(true);
            if(x) {
                const isConfirmed = await this.requestsService.confirmTrip({
                    tripId: this.route.snapshot.data['trip'].id,
                    layovers: this.form.get('layover').value
                  })
                  this._confirmLoading$.next(false);
                if(isConfirmed) {
                    this.notificationService.successNotification("moduleList.dispatching.view.confirm.modal.notification.success");
                    this.navigationService.goToPreviousPage();
                } else {
                    this.notificationService.errorNotification("moduleList.dispatching.view.confirm.modal.notification.error");
                }
            }
          });
    }

    /**
     * @description A method to cancel the trip
     * @returns {void}
     */
    protected cancelTrip(): void {
        this.modalService.openModal({
          title: "moduleList.dispatching.view.confirm.cancelModal.title",
          text: "moduleList.dispatching.view.confirm.cancelModal.content",
          confirmCaption: "moduleList.dispatching.view.confirm.cancelModal.acceptButton",
          cancelCaption: "moduleList.dispatching.view.confirm.cancelModal.rejectButton"
        }).then(async x => {
          this._cancelLoading$.next(true);
          const id = this.route.snapshot.data['trip'].id;
          if(x) {
              const isCanceledSucessfully = await this.requestsService.cancelTrip(id);
              this._cancelLoading$.next(false);
              if(isCanceledSucessfully) {
                  this.notificationService.successNotification('moduleList.dispatching.view.confirm.cancelModal.notification.success');
                  this.navigationService.goToPreviousPage();
              } else {
                  this.notificationService.errorNotification('moduleList.dispatching.view.confirm.cancelModal.notification.error');
              }
          }
        });
      }

    /** @inheritdoc */
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
      }
  }