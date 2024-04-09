import { Component, inject } from "@angular/core";
import { BasePartnerPageComponent } from "../base-partner-page.component";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { GhDate } from "../../misc/classes/gh-date";
import { PartnerRoutes } from "../partner.route";
import { OrderFilterInfo } from "../../api/requests/requests.type";
import { ItemsStatus } from "../../client/orders/base-orders.component";
import { UsersService } from "../../services/users.service";
import { SUCCURSALE_BY_COUNTRY } from "../../misc/constants/countries/countries.type";

/**
 * @class PartnerReceiveItemComponent
 * @description The partner receive item component
 */
@Component({
    selector: 'partner-receive-item',
    templateUrl: './receive-item.component.html',
    styleUrls: ['../base-page.component.scss']
})
  export class PartnerReceiveItemComponent extends BasePartnerPageComponent {
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
        const userInfo = await this.userService.getPartnerUserInfo(this.userService.currentUserId);
        const userRegion = SUCCURSALE_BY_COUNTRY.find(x => x.regions.some(z => z[1].name === userInfo.succursale))
            .regions.find(z => z[1].name === userInfo.succursale)
        return orders.filter(order => order.destinationRegion === userRegion[0])
            .filter(order => order.item.status === ItemsStatus.ON_DELIVERY);
    };

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
        PartnerRoutes.receiveItem.currentParams = queryParams;
        return this.router.navigate([PartnerRoutes.receiveItemView.fullPath()], { queryParams:  queryParams} )
    }
  }  