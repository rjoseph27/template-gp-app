import { Component, inject } from "@angular/core";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { OrderFilterInfo } from "../../api/requests/requests.type";
import { PartnerRoutes } from "../partner.route";
import { BasePartnerPageComponent } from "../base-partner-page.component";
import { GhDate } from "../../misc/classes/gh-date";
import { CountryUtil } from "../../misc/util/country.util";
import { COUNTRY_INFO_LIST } from "../../misc/constants/countries/countries";
import { PartnerUserInfo } from "../../api/users/users.type";

/**
 * @class PartnerCommissionComponent
 * @description The partner commission component
 */
@Component({
    selector: 'partner-commission',
    templateUrl: './commission.component.html',
    styleUrls: ['../base-page.component.scss']
})
  export class PartnerCommissionComponent extends BasePartnerPageComponent {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /** @inheritdoc */
    override fetchElements = async (orderFilter: OrderFilter) => {
      const country = CountryUtil.getCountryBySuccursale((<PartnerUserInfo>this.route.snapshot.data['userInfo']).succursale)
      const orders = await this.requestsService.commission({
        ...orderFilter,
        location: Array.from(COUNTRY_INFO_LIST.find(x => x.name === country).succursales)
        .find(x => (<PartnerUserInfo>this.route.snapshot.data['userInfo']).succursale === x[1].name)[0]
      })
      return orders;
    };

    /**
     * @description The view factory
     * @type {(row: OrderFilterInfo) => void}
     */
    protected readonly viewFactory = (row: OrderFilterInfo) => {
        const queryParams = {
            id: row.orderId,
            deliveryDate: new GhDate(row.departureDate).toISOString(),
            from: row.originAirport,
            to: row.destinationAirport,
            userId: row.userId 
        }
        PartnerRoutes.commission.currentParams = queryParams;
        return this.router.navigate([PartnerRoutes.commissionView.fullPath()], { queryParams:  queryParams} )
    }
  }  