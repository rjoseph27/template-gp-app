import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
import { ItemInformation } from "../../../core/layouts/request/item-information/item-information.component";
import { MoneyUtil } from "../../../misc/util/money.util";
import { CurrencyService } from "../../../services/currency.service";
import { NavigationService } from "../../../services/navigation.service";
import { ModalService } from "../../../services/modal.service";
import { NotificationService } from "../../../services/notification.service";
import { ClientRequestsService } from "../../../client/service/requests.service";
import { PartnerRoutes } from "../../partner.route";
import { EditItemInformationStatus } from "../../../api/requests/requests.type";

/**
 * @class PartnerRegisterItemEditComponent
 * @description The partner register item edit component
 */
@Component({
    selector: 'partner-register-item-edit',
    templateUrl: './register-item-edit.component.html',
    styleUrls: ['./register-item-edit.component.scss'],
    providers: [ModalService]
  })
  export class PartnerRegisterItemEditComponent implements OnInit {
    /**
     * @description The activated route service
     * @type {Router}
     */
    private readonly route = inject(ActivatedRoute);

    /**
     * @description The router service
     * @type {Router}
     */
    private readonly router = inject(Router);
    
    /**
     * @description The backing field for item information
     * @type {BehaviorSubject<ItemInformation[]>}
     */
    private readonly _itemInformation$ = new BehaviorSubject<ItemInformation[]>([this.route.snapshot.data['orderDetails'].itemInformation])

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    protected readonly requestsService = inject(ClientRequestsService);

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
     * @description The currency of the order
     * @type {number}
     */
    protected readonly currency = this.route.snapshot.data['orderDetails'].currency;

    /**
    * @description The navigation service
    * @type {NavigationService}
    */
    private readonly navigationService: NavigationService = inject(NavigationService);

    /**
    * @description The notification service
    * @type {NotificationService}
    */
    protected readonly notificationService: NotificationService = inject(NotificationService);

    /**
    * @description The currency service
    * @type {CurrencyService}
    */
    private readonly currencyService = inject(CurrencyService);

    /**
     * @description The modal service
     * @type {ModalService}
     */
    private readonly modalService = inject(ModalService);
    
    /**
     * @description The item information
     * @type {ItemInformation[]}
     */
    protected get itemInformation() {
        return this._itemInformation$.getValue();
    }
    protected set itemInformation(value: ItemInformation[]) {
        this._itemInformation$.next(value);
    }

    /** @inheritdoc */
    ngOnInit(): void {
      this._itemInformation$.asObservable().pipe(
        tap(async x => {
            const currency = await this.currencyService.getCurrency(this.currency);
            let price = Math.round(MoneyUtil.getPrice(x[0], {
            specificPrice: this.route.snapshot.data['orderDetails'].specificPrice,
            defaultPrice: this.route.snapshot.data['orderDetails'].defaultPrice
          }, currency[this.currency]));
          this._currentPrice$.next(MoneyUtil.totalPrice(price, currency[this.currency]));
        })
      ).subscribe();
    }

    /**
     * @description A method to go to the previous page
     * @returns {void}
     */
    protected goToPreviousPage(): void {
      this.navigationService.goToPreviousPage();
    }

    /**
     * @description A method to confirm the edit
     * @returns {void}
     */
    protected confirm(): void {
      this.modalService.openModal({
        title: "moduleList.registerItem.edit.modal.title",
        text: "moduleList.registerItem.edit.modal.content",
        confirmCaption: "moduleList.registerItem.edit.modal.confirm",
        cancelCaption: "moduleList.registerItem.edit.modal.cancel"
      }).then(async x => {
        if(x)
        {
          const orderToEdit = {
            id: this.route.snapshot.data['orderDetails'].itemGroupId,
            itemInformation: {...this.itemInformation[0], id: this.route.snapshot.data['orderDetails'].itemInformation.id}
          }

          this.requestsService.editItemInformation(orderToEdit).then((x) => {
            if(x === EditItemInformationStatus.ITEM_WILL_BE_REVIEWED_BY_GP) {
              this.router.navigate([PartnerRoutes.registerItem.fullPath()]);
            } else {
              this.navigationService.goToPreviousPage();
            }
            this.notificationService.successNotification('moduleList.registerItem.edit.modal.notification.success');
          })
        }
      });
    }
  }