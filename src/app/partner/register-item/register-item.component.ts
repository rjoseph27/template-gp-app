import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, map } from "rxjs";
import { COUNTRY_INFO_LIST } from "../../misc/constants/countries/countries";
import { ClientRequestsService } from "../../client/service/requests.service";
import { OrderFilter } from "../../core/layouts/filter/order-filter/order-filter.component";
import { OrderFilterInfo } from "../../api/requests/requests.type";
import { PartnerRoutes } from "../partner.route";
import { SUCCURSALE_BY_COUNTRY } from "../../misc/constants/countries/countries.type";

/**
 * @component PartnerRegisterItemComponent
 * @description The register item component for the partner module
 */
@Component({
    selector: 'partner-register-item',
    templateUrl: './register-item.component.html',
    styleUrls: ['./register-item.component.scss']
  })
  export class PartnerRegisterItemComponent implements AfterContentChecked {
    /**
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    private readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
    * @description An observable for the user info
    * @type {Observable<string>}
    */
    private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']))

    /**
     * @description An observable for the user country
     * @type {Observable<Country>}
     */
    protected readonly country$ = this.userInfo$.pipe(map(userInfo => SUCCURSALE_BY_COUNTRY.find(x => x.regions.find(z => z[1].name === userInfo.succursale)).country));

    /**
     * @description The backing field for the elements
     * @type {BehaviorSubject<OrderFilterInfo[]>}
     */
    private readonly _elements$ = new BehaviorSubject<OrderFilterInfo[]>([]);

    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * @description The elements to display
     * @type {Observable<OrderFilterInfo[]>}
     */
    protected readonly elements$ = this._elements$.asObservable();

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
     * @description The backing field for the hasBeenFiltered
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _hasBeenFiltered$ = new BehaviorSubject<boolean>(false);

    /**
     * @description Whether the table has been filtered
     * @type {Observable<boolean>}
     */
    protected readonly hasBeenFiltered$ = this._hasBeenFiltered$.asObservable();

    /**
    * @description The router service
    * @type {Router}
    */
    protected readonly router: Router = inject(Router);

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
        PartnerRoutes.registerItemView.currentParams = queryParams;
        return this.router.navigate([PartnerRoutes.registerItemView.fullPath()], { queryParams:  queryParams} )
    }

    /**
     * @description Filter the orders
     * @param orderFilter The params to filter
     * @returns {Promise<void>}
     */
    protected async filter(orderFilter: OrderFilter) {
        const countrySuccursale = SUCCURSALE_BY_COUNTRY.find(x => x.regions.find(z => z[1].name === this.route.snapshot.data['userInfo'].succursale))
        const region = countrySuccursale.regions.find(x => x[1].name === this.route.snapshot.data['userInfo'].succursale)[0]
        this._elements$.next(undefined)
        const orders = await this.requestsService.orderFilter({...orderFilter, userCountry: countrySuccursale.country, userRegion: region});
        this._elements$.next(orders);
        this._hasBeenFiltered$.next(true);
    }

    /** @inheritdoc */
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }
  }  