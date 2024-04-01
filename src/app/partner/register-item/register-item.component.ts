import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { OrderFilterInfo } from "../../api/requests/requests.type";
import { PartnerRoutes } from "../partner.route";
import { BasePartnerPageComponent } from "../base-partner-page.component";
import { GhDate } from "../../misc/classes/gh-date";

/**
 * @component PartnerRegisterItemComponent
 * @description The register item component for the partner module
 */
@Component({
    selector: 'partner-register-item',
    templateUrl: './register-item.component.html',
    styleUrls: ['../base-page.component.scss']
})
  export class PartnerRegisterItemComponent extends BasePartnerPageComponent {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /** @inheritdoc */
    override fetchElements = (orderFilter: OrderFilter) => this.requestsService.orderFilter(orderFilter);

    /**
     * @description The view factory
     * @type {(row: OrderFilterInfo) => void}
     */
    protected readonly viewFactory = (row: OrderFilterInfo) => {
        const queryParams = {
            id: row.orderId,
            deliveryDate: new GhDate(row.departureDate).getDate().toISOString(),
            from: row.originAirport,
            to: row.destinationAirport,
            userId: row.userId 
        }
        PartnerRoutes.registerItemView.currentParams = queryParams;
        return this.router.navigate([PartnerRoutes.registerItemView.fullPath()], { queryParams:  queryParams} )
    }
  }  