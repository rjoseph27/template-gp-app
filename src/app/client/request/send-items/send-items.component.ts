import { Component } from "@angular/core";
import { CurrentFormService } from "../../../services/current-form.service";

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
 
  
}
