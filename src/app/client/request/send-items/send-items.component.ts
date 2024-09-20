import { Component, OnInit, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { BaseRequestComponent } from "../base-request.component";
import { ClientSendItemsService, SendItemsRequest } from "../../service/send-items.service";
import { map, tap } from "rxjs/operators";
import { ClientRoutes } from "../../client.route";
import { COUNTRY_INFO_LIST } from "../../../misc/constants/countries/countries";

/**
 * @class ClientSendItemsComponent
 * @description The send items component for the client module
 */
@Component({
  selector: 'client-send-items',
  templateUrl: './send-items.component.html',
  styleUrls: ['../request.scss'],
  providers: [CurrentFormService]
})
export class ClientSendItemsComponent extends BaseRequestComponent implements OnInit {
  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly sendItemsService = inject(ClientSendItemsService);

  /**
   * @description The current request
   * @type {SendItemsRequest}
   */
  protected readonly request = this.sendItemsService.requests;

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap(async (loading) => {
        if(loading) {
          this.sendItemsService.requests = {...this.currentFormService.currentForm.value, userId: this.usersService.currentUserId, currency: this.currency.currency};
          this.router.navigate([`${ClientRoutes.calendar.fullPath()}`]);
        }
      })
    ).subscribe()
  }
}
