import { Component, inject } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";
import { ActivatedRoute } from "@angular/router";

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
export class ClientSendItemsComponent {
  /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
 
  /**
   * @description The country of the user
   * @type {string}
   */
  protected readonly userCountry = this.route.snapshot.data['userInfo'].country
}
