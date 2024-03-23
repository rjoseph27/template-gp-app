import { Component, inject } from "@angular/core";
import { BasePartnerPageComponent } from "../base-partner-page.component";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilterInfo } from "../../api/requests/requests.type";
import { PartnerRoutes } from "../partner.route";

/**
 * @class PartnerDispatchingComponent
 * @description The partner dispatching component
 */
@Component({
    selector: 'partner-dispatching',
    templateUrl: './dispatching.component.html',
    styleUrls: ['../base-page.component.scss']
  })
  export class PartnerDispatchingComponent extends BasePartnerPageComponent {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);
    
    /** @inheritdoc */
    override fetchElements = (orderFilter: OrderFilter) => this.requestsService.filterTrip(orderFilter);

    /**
     * @description The view factory
     * @type {(row: OrderFilterInfo) => void}
     */
    protected readonly viewFactory = (row: OrderFilterInfo) => {
        const queryParams = {
            id: row.orderId,
            deliveryDate: row.departureDate,
            from: row.originAirport,
            to: row.destinationAirport,
            userId: row.userId 
        }
        PartnerRoutes.dispatching.currentParams = queryParams;
        return this.router.navigate([PartnerRoutes.dispatchingView.fullPath()], { queryParams:  queryParams} )
    }
}