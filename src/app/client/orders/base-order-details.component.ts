import { inject } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { ClientRequestsService } from "../service/requests.service";
import { COUNTRY_INFO_LIST } from "../../misc/constants/countries/countries";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ModalService } from "../../services/modal.service";

export abstract class baseOrderDetailsComponent {
    /**
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    protected readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
    * @description An observable for the order details
    * @type {Observable<OrderDetails>}
    */
    protected readonly orderDetail$ = this.route.data.pipe(map(data => data['orderDetails']));
    
    /**
    * @description The angular router service.
    * @type {Router}
    */
    protected readonly router: Router = inject(Router);
    
    /**
    * @description The country of the user
    * @type {string}
    */
    protected readonly userCountry = this.route.snapshot.data['userInfo'].country;
    
    /**
    * @description The currency of the user
    * @type {string}
    */
    protected readonly userCurrency = COUNTRY_INFO_LIST.find(x => x.name === this.userCountry).currency;
    
    /**
    * @description The notification service
    * @type {NotificationService}
    */
    protected readonly notificationService: NotificationService = inject(NotificationService);
    
    /**
    * @description The requests service
    * @type {ClientRequestsService}
    */
    protected readonly requestsService = inject(ClientRequestsService);

    /**
    * @description The modal service
    * @type {ModalService}
    */
    protected readonly modalService: ModalService = inject(ModalService);
}