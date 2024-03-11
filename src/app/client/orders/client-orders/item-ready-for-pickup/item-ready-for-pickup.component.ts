import { Component, inject } from "@angular/core";
import { baseClientOrderDetailsComponent } from "../base-client-order-details.component";
import { ModalService } from "../../../../services/modal.service";
import { map } from "rxjs/operators";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { TranslateService } from "@ngx-translate/core";
import { combineLatest } from "rxjs";

/**
 * @class ClientItemReadyForPickupComponent
 * @description The item ready for pickup component
 */
@Component({
    selector: 'client-item-ready-for-pickup',
    templateUrl: './item-ready-for-pickup.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientItemReadyForPickupComponent extends baseClientOrderDetailsComponent {
    /**
     * @description An observable of the address of the succursale
     * @type {Observable<string>}
     */
    private readonly succursaleAddress$ = this.orderDetail$.pipe(map(orderDetails => COUNTRY_INFO_LIST.find(x => x.name === orderDetails.destinationCountry).succursales.get(orderDetails.destinationRegion).address));

    /**
     * @description An observable of the phone number of the succursale
     * @type {Observable<string>}
     */
    private readonly succursalePhone$ = this.orderDetail$.pipe(map(orderDetails => COUNTRY_INFO_LIST.find(x => x.name === orderDetails.destinationCountry).succursales.get(orderDetails.destinationRegion).phone));

    /**
     * @description The translate service
     * @type {TranslateService}
     */
    private readonly translate: TranslateService = inject(TranslateService);

    /**
     * @description An observable of the content text
     * @type {Observable<string>}
     */
    protected readonly contentText$ = combineLatest([this.succursalePhone$, this.succursaleAddress$])
        .pipe(map(([phone, address]) => this.translate.instant('moduleList.client.orders.readyForPickup.content', {
            phone: phone,
            address: address })))
  }