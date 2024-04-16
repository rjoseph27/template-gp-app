import { Component } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { PartnerRoutes } from "../../partner.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { SUCCURSALE_BY_COUNTRY } from "../../../misc/constants/countries/countries.type";
import { PartnerUserInfo } from "../../../api/users/users.type";
import { CountryUtil } from "../../../misc/util/country.util";
import { SelectFieldOption } from "../../../core/elements/input/select-field/select-field.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { REQUIRED_VALIDATION } from "../../../misc/constants/validations";

/**
 * @class PartnerRedirectItemsViewComponent
 * @description The partner redirect items view component
 */
@Component({
    selector: 'partner-redirect-items-view',
    templateUrl: './redirect-items-view.component.html',
    styleUrls: ['./redirect-items-view.component.scss'],
    providers: [ModalService]
  })
  export class PartnerRedirectItemsViewComponent extends BaseOrderDetailsComponent {
    /**
     * @description The backing field for the redirect items loading
     * @type {BehaviorSubject<boolean>}
     */
    private readonly _redirectItemsLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * @description An observable for the redirect items loading
     * @type {Observable<boolean>}
     */
    protected readonly redirectItemsLoading$ = this._redirectItemsLoading$.asObservable();

    /**
     * @description The name of the succursale field
     * @type {string}
     */
    protected readonly succursaleField = 'succursale';

    /**
     * @description The error captions for the succursale field
     * @type {Map<string, string>}
     */
    protected readonly succursaleErrorCaptions = new Map<string, string>([
      [REQUIRED_VALIDATION, "moduleList.redirectItems.view.succursaleOption.errors.required"],
    ]);

    /**
     * @description The form
     * @type {FormGroup}
     */
    protected readonly form = new FormGroup({succursale: new FormControl(null, [Validators.required])})

    /**
     * @description The options for the succursale
     * @type {Observable<SelectFieldOption[]>}
     */
    protected readonly succursaleOption$: Observable<SelectFieldOption[]> = this.route.data.pipe(
      map(data => {
        const country = CountryUtil.getCountryBySuccursale((<PartnerUserInfo>data['userInfo']).succursale)
        return Array.from(COUNTRY_INFO_LIST.find(x => x.name === country).succursales)
          .filter(x => (<PartnerUserInfo>data['userInfo']).succursale !== x[1].name)
          .map(x => {
          return {
            label: x[1].address,
            value: x[0]
          }
        }
      )})
    );

    /** @inheritdoc */
    override readonly currency$ = this.route.data.pipe(
        map(data => {
            const country = SUCCURSALE_BY_COUNTRY.find(x => x.regions.some(z => z[1].name === data['userInfo'].succursale))
            return country.country;
        }),
        map(country => COUNTRY_INFO_LIST.find(x => x.name === country).currency.currency)
    );  

    /**
     * @description The method to redirect items
     * @type {void}
     */
    protected redirectItems() {
        this.modalService.openModal({
            title: "moduleList.redirectItems.view.modal.title",
            text: "moduleList.redirectItems.view.modal.content",
            confirmCaption: "moduleList.redirectItems.view.modal.confirm",
            cancelCaption: "moduleList.redirectItems.view.modal.cancel"
          }).then(async x => {
            const country = CountryUtil.getCountryBySuccursale((<PartnerUserInfo>this.route.snapshot.data['userInfo']).succursale);
            if(x)
            {
              const orderDetails = this.route.snapshot.data['orderDetails'];
              this._redirectItemsLoading$.next(true);
              this.requestsService.redirectItems({
                id: orderDetails.itemGroupId, 
                tripId: orderDetails.tripId, 
                orderId: orderDetails.itemInformation.id.toString(),
                location: Array.from(COUNTRY_INFO_LIST.find(x => x.name === country).succursales).find(x => (x[0] as string) === this.form.get(this.succursaleField).value)[0]
              }).then(() => {
                if(x) {
                  this._redirectItemsLoading$.next(false);
                  this.notificationService.successNotification('moduleList.redirectItems.view.modal.notification.success');
                  this.router.navigate([PartnerRoutes.redirectItems.fullPath()]);
                } else {
                  this.notificationService.errorNotification('moduleList.redirectItems.view.modal.notification.error');
                }
              });
            }
          })
    }
  }