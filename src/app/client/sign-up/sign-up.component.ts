import { Component, OnInit, inject, } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CurrentFormService } from '../../services/current-form.service';
import { combineLatest, map, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StringUtil } from '../../misc/util/string.util';
import { ClientRoutes } from '../../client.route';

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

  /**
   * @description The translate service
   * @type {TranslateService}
   */
  private readonly translateService = inject(TranslateService);

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

  /**
   * @description The log in url
   * @type {string}
   */
  protected get logInUrl(): string {
    return ClientRoutes.login.fullPath();
  }
  
  /**
   * @description An observable for the terms and conditions caption.
   * @type {Observable<string>}
   */
  protected readonly termsAndConditionsCaption$ = combineLatest([
    this.translateService.get('global.signup.accountDetails.termsAndConditions.label'),
    this.translateService.get('global.signup.accountDetails.termsAndConditions.highlight')
  ]).pipe(
    map(([text,keyword]) => StringUtil.highlightText(text,keyword))
  );

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap((loading) => {
        if(loading) {
          this.usersService.create(this.currentFormService.currentForm.value).then(() => {
            this.currentFormService.submitting = false;
          });
        }

      })
    ).subscribe()
  }
}
