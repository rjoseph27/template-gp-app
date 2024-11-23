import { Component, OnInit, inject, } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CurrentFormService } from '../../services/current-form.service';
import { combineLatest, map, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StringUtil } from '../../misc/util/string.util';
import { ClientRoutes } from '../client.route';
import { Language } from '../../misc/enums/language.enum';
import { AccountType, CreateUser } from '../../api/users/users.type';

/**
 * @constant
 * @description The title of the SIGN UP page
 */
const NEW_ACCOUNT_PAGE_TITLE = 'global.signup.title';

/**
 * @class ClientSignUpComponent
 * @description The sign up page for the users of the application.
 */
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
    this.translateService.get('global.signup.termsAndConditions.label'),
    this.translateService.get('global.signup.termsAndConditions.highlight')
  ]).pipe(
    map(([text,keyword]) => StringUtil.highlightText(text,keyword))
  );

  /** @inheritdoc */
  ngOnInit(): void {
    this.currentFormService.submitting$.pipe(
      tap((loading) => {
        if(loading) {
          const createUser: CreateUser = this.currentFormService.currentForm.value;
          createUser.language = Language[this.translateService.currentLang as keyof typeof Language];
          createUser.type = AccountType.USER;
          this.usersService.create(createUser).finally(() => this.currentFormService.submitting = false);
        }

      })
    ).subscribe()
  }
}
