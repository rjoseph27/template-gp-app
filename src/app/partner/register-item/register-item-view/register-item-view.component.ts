import { Component, OnInit, inject } from "@angular/core";
import { BaseOrderDetailsComponent } from "../../../misc/base-class/base-order-details.component";
import { map, tap } from "rxjs/operators";
import { ModalService } from "../../../services/modal.service";
import { PartnerRoutes } from "../../partner.route";
import { PartnerRegisterItemService } from "../../service/register-item.service";

/**
 * @class PartnerRegisterItemViewComponent
 * @description The partner register item view component
 */
@Component({
    selector: 'partner-register-item-view',
    templateUrl: './register-item-view.component.html',
    styleUrls: ['./register-item-view.component.scss'],
    providers: [ModalService]
  })
  export class PartnerRegisterItemViewComponent extends BaseOrderDetailsComponent implements OnInit {
    /**
     * @description The currency of the order
     * @type {Observable<string>}
     */
    protected readonly currency$ = this.orderDetail$.pipe(map(orderDetails => orderDetails.currency));

    /**
     * @description The register item service
     * @type {PartnerRegisterItemService}
     */
    private readonly registerItemService = inject(PartnerRegisterItemService);

    /**
     * @description A method to go to the edit page
     * @returns {void}
     */
    protected goToEditPage(): void {
      this.router.navigate([PartnerRoutes.registerItemEdit.fullPath()])
    }

    /** @inheritdoc */
    ngOnInit(): void {
      this.orderDetail$.pipe(
        tap(orderDetails => this.registerItemService.currentOrderDetails = orderDetails))
      .subscribe();
    }
  }