import { Component, inject } from "@angular/core";
import { BasePartnerPageComponent } from "../base-partner-page.component";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { OrderFilterInfo } from "../../api/requests/requests.type";
import { PartnerRoutes } from "../partner.route";

/**
 * @component PartnerGpPickUpComponent
 * @description The gp pick up component for the partner module
 */
@Component({
    selector: 'partner-gp-pick-up',
    templateUrl: './gp-pick-up.component.html',
    styleUrls: ['../base-page.component.scss']
  })
  export class PartnerGpPickUpComponent extends BasePartnerPageComponent {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /** @inheritdoc */
    override fetchElements = (orderFilter: OrderFilter) => this.requestsService.orderFilterForGp(orderFilter); 

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
      PartnerRoutes.gpPickUpView.currentParams = queryParams;
      return this.router.navigate([PartnerRoutes.gpPickUpView.fullPath()], { queryParams:  queryParams} )
  }
  }