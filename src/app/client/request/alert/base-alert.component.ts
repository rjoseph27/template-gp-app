import { Directive, inject } from "@angular/core";
import { BaseRequestComponent } from "../base-request.component";
import { map } from "rxjs/operators";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";
import { ClientRequestsService } from "../../service/requests.service";
import { NotificationService } from "../../../services/notification.service";

/**
 * @class BaseAlertComponent
 * @description The base alert component
 */
@Directive()
export class BaseAlertComponent extends BaseRequestComponent {
    /**
     * @description An observable for the user info
     * @type {Observable<UserInfo>}
     */
    private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']));

    /**
     * @description An observable for the currency
     * @type {Observable<Currency>}
     */
    protected readonly currency$ = this.userInfo$.pipe(map(userInfo => COUNTRY_INFO_LIST.find(x => x.name === userInfo.country).currency));

    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    protected readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The notification service
    * @type {NotificationService}
    */
    protected readonly notificationService: NotificationService = inject(NotificationService);
}