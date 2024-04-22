import { AfterContentChecked, ChangeDetectorRef, Component, inject } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { ClientRequestsService } from "../../client/service/requests.service";
import { BehaviorSubject, map } from "rxjs";
import { BillingFilterInfo } from "../../api/requests/requests.type";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../../services/users.service";
import { PartnerRoutes } from "../partner.route";
import { MoneyUtil } from "../../misc/util/money.util";
import { CountryUtil } from "../../misc/util/country.util";
import { Country } from "../../misc/enums/country.enum";
import { GhDate } from "../../misc/classes/gh-date";

/**
 * @class PartnerPayGpComponent
 * @description The component that manage the pay of the GP
 */
@Component({
    selector: 'partner-pay-gp',
    templateUrl: './pay-gp.component.html',
    styleUrls: ['./pay-gp.component.scss'],
    providers: [ModalService]
  })
  export class PartnerPayGpComponent implements AfterContentChecked {
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    private readonly requestsService = inject(ClientRequestsService);

    /**
     * @description The backing field for the elements
     * @type {BehaviorSubject<OrderFilterInfo[]>}
     */
    private readonly _elements$ = new BehaviorSubject<BillingFilterInfo[]>([]);

    /**
     * @description The route
     * @type {ActivatedRoute}
     */
    private readonly route = inject(ActivatedRoute)

    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
    * @description The users service
    * @type {UsersService}
    */
    protected readonly userService: UsersService = inject(UsersService);

    /**
     * @description The backing field for current price
     * @type {BehaviorSubject<number>}
     */
    private readonly _currentPrice$ = new BehaviorSubject<number>(0);

    /**
     * @description The current price
     * @type {Observable<number>}
     */
    protected readonly currentPrice$ = this._currentPrice$.asObservable(); 

    /**
     * @description The elements to display
     * @type {Observable<OrderFilterInfo[]>}
     */
    protected readonly elements$ = this._elements$.asObservable();

    /**
     * @description The currency of the user
     * @type {Observable<string>}
     */
    protected readonly currency$ = this.route.data.pipe(map(data => data['currency'].currency));

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
     * @description Backing field for the selected elements
     * @type {BehaviorSubject<OrderFilterInfo[]>}
     */
    private readonly _selectedElements$ = new BehaviorSubject<BillingFilterInfo[]>([]);

    /**
     * @description The selected elements
     * @type {Observable<OrderFilterInfo[]>}
     */
    protected readonly selectedElements$ = this._selectedElements$.asObservable();

    /**
     * @description The router service
     * @type {Router}
     */
    private readonly router = inject(Router);

    /**
     * @description The backing field for confirm loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _confirmLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description The confirm loading
     * @type {Observable<boolean>}
     */
    protected readonly confirmLoading$ = this._confirmLoading$.asObservable();

    /**
    * @description The modal service
    * @type {ModalService}
    */
    protected readonly modalService: ModalService = inject(ModalService);

    /**
     * @description A method to calculate the price
     * @returns {(row: BillingFilterInfo) => void}
     */
    protected readonly calculatePriceResolver = (row: BillingFilterInfo) => {
        const rates = this.route.snapshot.data['currency'].rates;
        const price = Math.round(MoneyUtil.getPrice(row, {
            specificPrice: row.specificPrice,
            defaultPrice: row.defaultPrice
        }, rates[row.currency]));
        return MoneyUtil.withdrawMoneyAmount(price)
    }

    /**
     * @description The view factory
     * @type {(row: OrderFilterInfo) => void}
     */
    protected readonly viewFactory = (row: BillingFilterInfo) => {
        const queryParams = {
            id: row.id,
            deliveryDate: new GhDate(row.details.deliveryDate).getDate().toISOString(),
            from: row.details.from,
            to: row.details.to,
            userId: row.details.userId 
        }
        return this.router.navigate([PartnerRoutes.billingView.fullPath()], { queryParams:  queryParams} )
    }
    
    /**
     * @description A method to filter the billing
     * @param email The email to filter
     * @returns {void}
     */
    protected async filter(email: string) {
        this._elements$.next(undefined)
        this._selectedElements$.next([])
        this._currentPrice$.next(0);
        const orders = await this.requestsService.findPaysheetByEmail(email);
        this._elements$.next(orders);
        this._hasBeenFiltered$.next(true);
    }

    /** @inheritdoc */
    async ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * @description A method to calculate the current price
     * @param orders The orders to calculate the price for
     * @returns {void}
     */
    protected calculateCurrentPrice(orders: BillingFilterInfo[]) {
        this._selectedElements$.next(orders);
        const rates = this.route.snapshot.data['currency'].rates;
        this._currentPrice$.next(orders.reduce((acc, order) => {
            let price = Math.round(MoneyUtil.getPrice(order, {
                specificPrice: order.specificPrice,
                defaultPrice: order.defaultPrice
            }, rates[order.currency]));
            price = MoneyUtil.withdrawMoneyAmount(price);
            return acc + price;
        }, 0));
    }

    /**
     * @description A method to confirm the payment
     * @returns {void}
     */
    protected async confirmPayment() {
        this.modalService.openModal({
            title: "moduleList.billing.confirmPayment.modal.title",
            text: "moduleList.billing.confirmPayment.modal.content",
            confirmCaption: "moduleList.billing.confirmPayment.modal.confirm",
            cancelCaption: "moduleList.billing.confirmPayment.modal.cancel"
        }).then(async x => {
            if(x)
            {
                this._confirmLoading$.next(true);
                const succursale = (await this.userService.getPartnerUserInfo(this.userService.currentUserId)).succursale
                const result = await this.requestsService.createPaysheet({
                    orders: this._selectedElements$.value,
                    country: CountryUtil.getCountryBySuccursale(succursale) as Country,
                    region: CountryUtil.getCityBySuccursale(succursale)
                }); 
                this._confirmLoading$.next(false);
                if(result) {
                    this._elements$.next(this._elements$.value.filter(x => !this._selectedElements$.value.includes(x)));
                }
                this._selectedElements$.next([]);
                this._currentPrice$.next(0);
            }
        })
    }
  }