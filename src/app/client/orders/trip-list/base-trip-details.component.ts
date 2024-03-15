import { ChangeDetectorRef, Directive, inject } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { FormMode } from "../../../misc/enums/form-mode.enum";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { ReportTrip } from "../../../api/requests/requests.type";
import { NotificationService } from "../../../services/notification.service";
import { ClientRequestsService } from "../../service/requests.service";
import { ClientRoutes } from "../../../client.route";

/**
 * @class BaseTripDetailsComponent
 * @description The base component for the trip details
 */
@Directive()
export abstract class BaseTripDetailsComponent {
    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
    * @description The modal service
    * @type {ModalService}
    */
    protected readonly modalService: ModalService = inject(ModalService);

    /**
     * @description The form mode for template use
     * @type {FormMode}
     */
    protected readonly formMode = FormMode;

    /**
     * @description The activated route
     * @type {ActivatedRoute}
     */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description The router service
     * @type {Router}
     */
    private readonly router: Router = inject(Router);
    
    /**
     * @description The details of the trip
     * @type {Observable<ReportTrip>}
     */
    protected readonly tripDetail$: Observable<ReportTrip> = this.route.data.pipe(map(data => data['tripDetails']));

    /**
    * @description The country of the user
    * @type {string}
    */
    protected readonly userCountry = this.route.snapshot.data['userInfo'].country;

    /**
    * @description The notification service
    * @type {NotificationService}
    */
    protected readonly notificationService: NotificationService = inject(NotificationService);
    
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    protected readonly requestsService = inject(ClientRequestsService);

    /**
     * @description A method to navigate to the trip list
     * @returns {void}
     */
    protected navigateToTripList(): void {
      this.router.navigate([ClientRoutes.tripList.fullPath()]);
    }

    /** @inheritdoc */
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * @description A method to cancel the trip
     * @returns {void}
     */
    protected cancelTrip(): void {
      this.modalService.openModal({
        title: "moduleList.gp.trip.plannedTrip.cancelModal.title",
        text: "moduleList.gp.trip.plannedTrip.cancelModal.content",
        confirmCaption: "moduleList.gp.trip.plannedTrip.cancelModal.acceptButton",
        cancelCaption: "moduleList.gp.trip.plannedTrip.cancelModal.rejectButton"
      }).then(async x => {
        const id = this.route.snapshot.data['tripDetails'].id;
        if(x) {
            const isCanceledSucessfully = await this.requestsService.cancelTrip(id);
            if(isCanceledSucessfully) {
                this.router.navigate([ClientRoutes.tripList.fullPath()]);
                this.notificationService.successNotification('moduleList.gp.trip.plannedTrip.cancelModal.notification.success');
            } else {
                this.notificationService.errorNotification('moduleList.gp.trip.plannedTrip.cancelModal.notification.error');
            }
        }
      });
    }
}