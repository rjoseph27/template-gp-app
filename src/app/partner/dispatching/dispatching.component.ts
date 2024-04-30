import { Component, inject } from "@angular/core";
import { BasePartnerPageComponent } from "../base-partner-page.component";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilterInfo, RequestTableElementRequest } from "../../api/requests/requests.type";
import { PartnerRoutes } from "../partner.route";
import { GhDate } from "../../misc/classes/gh-date";
import { CountryUtil } from "../../misc/util/country.util";

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
    override fetchElements = async (orderFilter: OrderFilter) => {
        const orders = await this.requestsService.filterTrip(orderFilter)
        return orders.filter(x => CountryUtil.getSuccursaleByAirportCode(x.originAirport) === this.route.snapshot.data['userInfo'].succursale)
    };

    /**
     * @description The view factory
     * @type {(row: OrderFilterInfo) => void}
     */
    protected readonly viewFactory = (row: OrderFilterInfo) => {
        const queryParams = <any>{
            id: row.orderId,
            deliveryDate: new GhDate(row.departureDate).toISOString(),
            from: row.originAirport,
            to: row.destinationAirport,
            userId: row.userId 
        }
        PartnerRoutes.dispatching.currentParams = queryParams;
        return this.router.navigate([PartnerRoutes.dispatchingView.fullPath()], { queryParams:  queryParams} )
    }
}