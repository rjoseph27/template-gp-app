import { Component, OnInit, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { BaseRequestComponent } from "../base-request.component";
import { ClientSendItemsService } from "../../service/send-items.service";
import { tap } from "rxjs/operators";
import { ClientRoutes } from "../../../client.route";

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
