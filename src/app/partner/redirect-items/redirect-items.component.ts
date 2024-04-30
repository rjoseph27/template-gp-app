import { Component, inject } from "@angular/core";
import { BasePartnerPageComponent } from "../base-partner-page.component";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { GhDate } from "../../misc/classes/gh-date";
import { PartnerRoutes } from "../partner.route";
import { OrderFilterInfo } from "../../api/requests/requests.type";
import { ItemsStatus } from "../../client/orders/base-orders.component";
import { UsersService } from "../../services/users.service";
import { CountryUtil } from "../../misc/util/country.util";

/**
 * @class PartnerRedirectItemsComponent
 * @description The partner redirect items component
 */
@Component({
    selector: 'partner-redirect-items',
    templateUrl: './redirect-items.component.html',
    styleUrls: ['../base-page.component.scss']
})
  export class PartnerRedirectItemsComponent extends BasePartnerPageComponent {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The users service
    * @type {UsersService}
    */
    protected readonly userService: UsersService = inject(UsersService);

    /** @inheritdoc */
    override fetchElements = async (orderFilter: OrderFilter) => {
        const orders = await this.requestsService.orderFilter(orderFilter);
        const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
        const succursaleCountry = CountryUtil.getCountryBySuccursale(succursale);
        return orders.filter(order => order.item.status === ItemsStatus.ON_DELIVERY || order.item.status === ItemsStatus.AT_CHECKPOINT || order.item.status === ItemsStatus.READY_TO_PICK_UP)
                    .filter(order => order.originCountry === succursaleCountry);
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
        PartnerRoutes.redirectItems.currentParams = queryParams;
        return this.router.navigate([PartnerRoutes.redirectItemsView.fullPath()], { queryParams:  queryParams} )
    }
  }  