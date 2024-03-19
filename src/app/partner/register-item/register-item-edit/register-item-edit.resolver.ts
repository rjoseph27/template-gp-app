import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { PartnerRegisterItemService } from "../../service/register-item.service";
import { PartnerRoutes } from "../../partner.route";
import { OrderDetails } from "../../../core/layouts/order-details/order-details.component";

/**
 * @class PartnerRegisterItemEditResolver
 * @description The partner register item edit resolver
 */
@Injectable()
export class PartnerRegisterItemEditResolver implements Resolve<OrderDetails> {
    /**
     * @description The register item service
     * @type {PartnerRegisterItemService}
     */
    private readonly registerItemService = inject(PartnerRegisterItemService);

    /**
     * @description The router service
     * @type {Router}
     */
    protected readonly router = inject(Router);
    
    /** @inheritdoc */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.registerItemService.currentOrderDetails) {
            return this.registerItemService.currentOrderDetails;
        } else {
            if(PartnerRoutes.registerItemView.currentParams) {
                this.router.navigate([PartnerRoutes.registerItemView.fullPath(), PartnerRoutes.registerItemView.currentParams]);
            } else {
                this.router.navigate([PartnerRoutes.registerItem.fullPath()]);
            }
            return undefined;
        }
    }
}