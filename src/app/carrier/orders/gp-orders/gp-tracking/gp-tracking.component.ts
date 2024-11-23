import { Component, inject } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { BaseTrackingPageComponent } from "../../../../core/layouts/tracking/base-tracking-page.component";
import { ModalService } from "../../../../services/modal.service";
import { ReportTrip } from "../../../../api/requests/requests.type";
import { TrackingPoint } from "../../../../core/layouts/tracking/tracking.type";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { CountryUtil } from "../../../../misc/util/country.util";
import { Observable } from "rxjs";
import { Tasks } from "../../../../misc/base-class/base-get-tasks.resolver";
import { CarrierRequestsService } from "../../../service/requests.service";
import { CarrierRoutes } from "../../../carrier.route";

/**
 * @class ClientTrackingComponent
 * @description The client gp tracking component
 */
@Component({
    selector: 'carrier-gp-tracking',
    templateUrl: './gp-tracking.component.html',
    styleUrls: ['./gp-tracking.component.scss'],
    providers: [ModalService]
  })
  export class CarrierTrackingComponent extends BaseTrackingPageComponent {
    /**
    * @description An observable for the order id
    * @type {Observable<string>}
    */
    protected readonly orderId$ = this.route.queryParamMap.pipe(map(params => params.get('id')));

    /**
     * @description The modal service
     * @type {ModalService}
     */
    protected readonly modalService = inject(ModalService);

    /**
    * @description The angular router service.
    * @type {Router}
    */
    private readonly router: Router = inject(Router);

    /**
     * @description The translate service
     * @type {TranslateService}
     */
    private readonly translateService: TranslateService = inject(TranslateService);

    /**
    * @description The requests service
    * @type {CarrierRequestsService}
    */
    private readonly requestsService = inject(CarrierRequestsService);

    /**
     * @description An observable for the tasks
     * @type {Observable<Tasks[]>}
     */
    protected readonly tasks$: Observable<Tasks[]> = this.route.data.pipe(map(data => data['tasks']),);

   /**
     * @description The method to add history
     * @type {(args: TrackingPoint) => Promise<boolean>}
     */
    protected readonly addHistoryResolver = async (args: TrackingPoint) => await this.requestsService.addHistory({
      ...args,
      tripId: this.route.snapshot.data['trip'].id
    })

    /**
    * @description A method to reload the page
    * @returns {void}
    */
    protected reloadPage(): void {
      // FIND A BETTER SOLUTION
      this.router.navigate([CarrierRoutes.gpOrders.fullPath()]).then(() => {
          this.router.navigate([CarrierRoutes.gpTracking.fullPath()], { queryParams: this.route.snapshot.queryParams });
      })
    }

    /**
     * @description A method to show the delay dialog
     * @returns {void}
     */
    protected showDelayDialog(): void {
      this.route.data.pipe(
        map(data => (<ReportTrip>data['trip'])),
        switchMap(trip => this.translateService.get(
          ['moduleList.gp.tracking.delayModal.title', 'moduleList.gp.tracking.delayModal.content'], 
          { 
            phone: COUNTRY_INFO_LIST.find(x => x.name === trip.userCountry).succursales.get(CountryUtil.getCityByAirportCode(trip.userAirport)).phone, 
            email: COUNTRY_INFO_LIST.find(x => x.name === trip.userCountry).succursales.get(CountryUtil.getCityByAirportCode(trip.userAirport)).email
          })),
          tap(x => this.modalService.openModal({
            title: x['moduleList.gp.tracking.delayModal.title'],
            text: x['moduleList.gp.tracking.delayModal.content'],
          }))
      )
        .subscribe()
      
    }
  }