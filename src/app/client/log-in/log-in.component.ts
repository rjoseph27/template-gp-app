import { Component, OnInit, inject, } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Credentials } from '../../api/users.service.api';
import { CurrentFormService } from '../../services/current-form.service';
import { tap } from 'rxjs/operators';

/**
 * @constant
 * @description The title of the application
 */
const ACCOUNT_PAGE_TITLE = 'account';

/**
 * @title Log In Component
 * @component GpHubIconComponent 
 * @description The log in page for the users of the application.
 */
@Component({
  selector: 'client-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  providers: [CurrentFormService]
})
export class ClientLogInComponent implements OnInit {
  /**
   * @description The title of the page
   * @type {string}
   */
  protected readonly pageTitle = ACCOUNT_PAGE_TITLE;

  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  private readonly currentFormService: CurrentFormService = inject(CurrentFormService);

  /**
   * @description The users service
   * @type {UsersService}
   */
  private readonly usersService: UsersService = inject(UsersService);

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap((loading) => {
        if(loading) {
          this.usersService.login(this.currentFormService.currentForm.value).then(() => {
            this.currentFormService.submitting = false;
          });
        }

      })
    ).subscribe()
  }
}
