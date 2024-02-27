import { Component, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { ActivatedRoute } from "@angular/router";
import { BaseRequestComponent } from "../base-request.component";

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
export class ClientSendItemsComponent extends BaseRequestComponent {
}
