import { Component } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";
import { BehaviorSubject, map, tap } from "rxjs";
import { PartnerRoutes } from "../../partner.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { SUCCURSALE_BY_COUNTRY } from "../../../misc/constants/countries/countries.type";

/**
 * @class PartnerReceiveItemViewComponent
 * @description The partner receive item view component
 */
@Component({
    selector: 'partner-receive-item-view',
    templateUrl: './receive-item-view.component.html',
    styleUrls: ['./receive-item-view.component.scss'],
    providers: [ModalService]
  })
  export class PartnerReceiveItemViewComponent extends BaseOrderDetailsComponent {
    /**
     * @description Backing field for the receive item button loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _receiveItemLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description The observable for the receive item button loading
     * @type {Observable<boolean>}
     */
    protected readonly receiveItemLoading$ = this._receiveItemLoading$.asObservable();

    /** @inheritdoc */
    override readonly currency$ = this.route.data.pipe(
        map(data => {
            const country = SUCCURSALE_BY_COUNTRY.find(x => x.regions.some(z => z[1].name === data['userInfo'].succursale))
            return country.country;
        }),
        map(country => COUNTRY_INFO_LIST.find(x => x.name === country).currency.currency)
    );  

    /**
     * @description The method to receive item
     * @type {void}
     */
    protected receiveItem() {
        this.modalService.openModal({
            title: "moduleList.receivingItem.modal.title",
            text: "moduleList.receivingItem.modal.content",
            confirmCaption: "moduleList.receivingItem.modal.confirm",
            cancelCaption: "moduleList.receivingItem.modal.cancel"
          }).then(async x => {
            if(x)
            {
              const orderDetails = this.route.snapshot.data['orderDetails'];
              this._receiveItemLoading$.next(true);
              this.requestsService.receiveItem({
                id: orderDetails.itemGroupId, 
                tripId: orderDetails.tripId, 
                orderId: orderDetails.itemInformation.id.toString()
              }).then(() => {
                if(x) {
                  this._receiveItemLoading$.next(false);
                  this.notificationService.successNotification('moduleList.receivingItem.modal.notification.success');
                  this.router.navigate([PartnerRoutes.receiveItem.fullPath()]);
                } else {
                  this.notificationService.errorNotification('moduleList.receivingItem.modal.notification.error');
                }
              });
            }
          })
    }
  }