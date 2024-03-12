import { Component, inject } from "@angular/core";
import { ModalService } from "../../../../services/modal.service";
import { combineLatest, map } from "rxjs";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { TranslateService } from "@ngx-translate/core";
import { BaseClientOrderDetailsComponent } from "../base-client-order-details.component";

/**
 * @class ClientWaitingReceptionComponent
 * @description The component for the waiting reception
 */
@Component({
    selector: 'client-waiting-reception',
    templateUrl: './waiting-reception.component.html',
    styleUrls: ['./../../base-order-details.component.scss'],
    providers: [ModalService]
  })
  export class ClientWaitingReceptionComponent extends BaseClientOrderDetailsComponent {
    /**
     * @description An observable of the address of the succursale
     * @type {Observable<string>}
     */
    private readonly succursaleAddress$ = this.orderDetail$.pipe(map(orderDetails => COUNTRY_INFO_LIST.find(x => x.name === orderDetails.originCountry).succursales.get(orderDetails.originRegion).address));

    /**
     * @description An observable of the phone number of the succursale
     * @type {Observable<string>}
     */
    private readonly succursalePhone$ = this.orderDetail$.pipe(map(orderDetails => COUNTRY_INFO_LIST.find(x => x.name === orderDetails.originCountry).succursales.get(orderDetails.originRegion).phone));

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
        .pipe(map(([phone, address]) => this.translate.instant('moduleList.client.orders.waitReception.content', {
            phone: phone,
            address: address })))
  }