import { Component } from "@angular/core";
import { CurrentFormService } from "../../services/current-form.service";

/**
 * @class ClientMakeRequestComponent
 * @description The make request component for the client module
 */
@Component({
  selector: 'client-make-request',
  templateUrl: './make-request.component.html',
  providers: [CurrentFormService]
})
export class ClientMakeRequestComponent {
 
  
}
