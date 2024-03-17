import { Component, OnInit, inject, } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CurrentFormService } from '../../services/current-form.service';
import { tap } from 'rxjs/operators';

/**
 * @constant PAGE_TITLE
 * @description The title of the page
 * @type {string}
 */
const PAGE_TITLE = 'Partnership';

/**
 * @class PartnerLogInComponent
 * @description The partner log in component
 */
@Component({
  selector: 'partner-log-in',
  templateUrl: './log-in.component.html',
  providers: [CurrentFormService]
})
export class PartnerLogInComponent implements OnInit {
  /**
   * @description The title of the page
   * @type {string}
   */
  protected readonly pageTitle = PAGE_TITLE;

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
          this.usersService.connectAsPartner(this.currentFormService.currentForm.value).then(() => {
            this.currentFormService.submitting = false;
          });
        }

      })
    ).subscribe()
  }
}
