import { Component, OnInit, inject, } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CurrentFormService } from '../../services/current-form.service';
import { tap } from 'rxjs/operators';

/**
 * @constant
 * @description The title of the SIGN UP page
 */
const NEW_ACCOUNT_PAGE_TITLE = 'new account';

@Component({
  selector: 'client-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [CurrentFormService]
})
export class ClientSignUpComponent implements OnInit {
  /**
   * @description The title of the page
   * @type {string}
   */
  protected readonly pageTitle = NEW_ACCOUNT_PAGE_TITLE;

  ngOnInit(): void {
  }
}
