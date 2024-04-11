import { AfterContentChecked, ChangeDetectorRef, Directive, inject } from "@angular/core";
import { map } from "rxjs/operators";
import { SUCCURSALE_BY_COUNTRY } from "../misc/constants/countries/countries.type";
import { ActivatedRoute, Router } from "@angular/router";
import { OrderFilter } from "../core/layouts/filter/order-filter/order-filter.component";
import { BehaviorSubject } from "rxjs";
import { OrderFilterInfo } from "../api/requests/requests.type";

/**
 * @class BasePartnerPageComponent
 * @description The base partner page component
 */
@Directive()
export abstract class BasePartnerPageComponent implements AfterContentChecked {
    /**
     * @description The backing field for the elements
     * @type {BehaviorSubject<OrderFilterInfo[]>}
     */
    private readonly _elements$ = new BehaviorSubject<OrderFilterInfo[]>([]);

    /**
    * @description The router service
    * @type {Router}
    */
    protected readonly router: Router = inject(Router);

    /**
     * @description The elements to display
     * @type {Observable<OrderFilterInfo[]>}
     */
    protected readonly elements$ = this._elements$.asObservable();

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
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);
        
    /**
    * @description An observable for the user info
    * @type {Observable<string>}
    */
    private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']))

    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * @description An observable for the user country
     * @type {Observable<Country>}
     */
    protected readonly country$ = this.userInfo$.pipe(map(userInfo => SUCCURSALE_BY_COUNTRY.find(x => x.regions.find(z => z[1].name === userInfo.succursale)).country));

    /** @inheritdoc */
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * @description Fetch the elements
     * @param orderFilter The params to filter
     * @returns {Promise<OrderFilterInfo[]>}
     */
    abstract fetchElements: (orderFilter: OrderFilter) => Promise<OrderFilterInfo[]>;

    /**
     * @description Filter the orders
     * @param orderFilter The params to filter
     * @returns {Promise<void>}
     */
    protected async filter(orderFilter: OrderFilter) {
        const countrySuccursale = SUCCURSALE_BY_COUNTRY.find(x => x.regions.find(z => z[1].name === this.route.snapshot.data['userInfo'].succursale))
        const region = countrySuccursale.regions.find(x => x[1].name === this.route.snapshot.data['userInfo'].succursale)[0]
        this._elements$.next(undefined)
        const orders = await this.fetchElements({...orderFilter, userCountry: countrySuccursale.country, userRegion: region});
        this._elements$.next(orders);
        this._hasBeenFiltered$.next(true);
    }
}