import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ClientRoutes } from "../../../client.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";

/**
 * @class ClientWaitingGpConfirmationComponent
 * @description The waiting for GP confirmation component
 */
@Component({
    selector: 'client-waiting-gp-confirmation',
    templateUrl: './waiting-gp-confirmation.component.html',
    styleUrls: ['./waiting-gp-confirmation.component.scss']
  })
  export class ClientWaitingGpConfirmationComponent {
    /**
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    private readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description An observable for the order details
     * @type {Observable<OrderDetails>}
     */
    protected readonly orderDetail$ = this.route.data.pipe(map(data => data['orderDetails']));

    /**
     * @description The angular router service.
     * @type {Router}
     */
    protected readonly router: Router = inject(Router);

    /**
    * @description The country of the user
    * @type {string}
    */
    protected readonly userCountry = this.route.snapshot.data['userInfo'].country;

    /**
    * @description The currency of the user
    * @type {string}
    */
    protected readonly userCurrency = COUNTRY_INFO_LIST.find(x => x.name === this.userCountry).currency;

    /**
    * @description Navigates to the my orders page
    * @returns {void}
    */
    navigateToMyOrders() {
        this.router.navigate([ClientRoutes.clientOrder.fullPath()]);
    }
  }