import { AfterContentChecked, Component, inject } from "@angular/core";
import { BaseTrackingPageComponent } from "../../../../core/layouts/tracking/base-tracking-page.component";
import { map } from "rxjs/operators";
import { ReportTrip } from "../../../../api/requests/requests.type";
import { SelectFieldOption } from "../../../../core/elements/input/select-field/select-field.component";
import { BehaviorSubject, Observable } from "rxjs";
import { ClientRequestsService } from "../../../../client/service/requests.service";
import { ModalService } from "../../../../services/modal.service";
import { Router } from "@angular/router";
import { PartnerRoutes } from "../../../partner.route";
import { TrackingPoint } from "../../../../core/layouts/tracking/tracking.type";
import { Tasks } from "../../../../misc/base-class/base-get-tasks.resolver";
import { TripStatus } from "../../../../client/orders/base-orders.component";

/**
 * @class PartnerManageTrackingComponent
 * @description The partner manage tracking component
 */
@Component({
    selector: 'partner-manage-tracking',
    templateUrl: './manage-tracking.component.html',
    styleUrls: ['./manage-tracking.component.scss'],
    providers: [ModalService]
  })
  export class PartnerManageTrackingComponent extends BaseTrackingPageComponent {    
    /**
     * @description An observable for the order list
     * @type {Observable<SelectFieldOption[]>}
     */
    protected readonly orderList$: Observable<SelectFieldOption[]> = this.route.data.pipe(map(data => {
        const options: SelectFieldOption[] = (<ReportTrip>data['trip']).orders.map(key => ({
            value: key.toString(),
            label: key.toString(),
        }))

        options.unshift({
            value: "*",
            label: 'deliveryExecption.orderList.all'
        })
        return options
    }))

    /**
     * @description An observable for the tasks
     * @type {Observable<Tasks[]>}
     */
    protected readonly tasks$: Observable<Tasks[]> = this.route.data.pipe(map(data => data['tasks']))

    /**
     * @description The method to add history
     * @type {(args: TrackingPoint) => Promise<boolean>}
     */
    protected readonly addHistoryResolver = async (args: TrackingPoint) => await this.requestsService.addHistory({
      ...args,
      tripId: this.route.snapshot.data['trip'].id
    })

    /**
     * @description The backing field for the order id
     * @type {BehaviorSubject<string>}
     */
    private readonly _orderId$ = new BehaviorSubject<string>(null)

    /**
     * @description An observable for the order id
     * @type {Observable<string>}
     */
    protected readonly orderId$ = this._orderId$.asObservable();

    /**
    * @description The order id
    * @type {string}
    */
    protected set orderId(value: string) {
        this._orderId$.next(value)
    }
    protected get orderId() {
        return this._orderId$.value
    }

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The angular router service.
    * @type {Router}
    */
    private readonly router: Router = inject(Router);

    /**
    * @description A method to reload the page
    * @returns {void}
    */
    protected reloadPage(): void {
        // FIND A BETTER SOLUTION
        this.router.navigate([PartnerRoutes.dispatching.fullPath()]).then(() => {
            this.router.navigate([PartnerRoutes.dispatchingView.fullPath()], { queryParams: this.route.snapshot.queryParams });
        })
      }

    /**
     * @description A method to navigate to the change date page
     * @returns {void}
     */
    protected changeDate(): void {
        PartnerRoutes.dispatchingView.currentParams = this.route.snapshot.queryParams
        this.router.navigate([PartnerRoutes.changeDate.fullPath()], { queryParams: this.route.snapshot.queryParams })
    }

    /**
     * @description The status when the trip is done
     * @type {TripStatus}
     */
    protected readonly tripDone = TripStatus.TRIP_DONE
  }