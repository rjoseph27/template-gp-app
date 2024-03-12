import { Component, inject } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { BaseGpOrderDetailsComponent } from "../base-gp-order-details.component";
import { map } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";

/**
 * @class ClientReadyForPickupComponent
 * @description The ready for pickup component
 */
@Component({
    selector: 'client-ready-for-pickup',
    templateUrl: './ready-for-pickup.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientReadyForPickupComponent extends BaseGpOrderDetailsComponent {
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
        .pipe(map(([phone, address]) => this.translate.instant('moduleList.gp.orders.readyForPickup.content', {
            phone: phone,
            address: address })))

  }