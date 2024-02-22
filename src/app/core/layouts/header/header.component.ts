import { AfterContentChecked, ChangeDetectorRef, Component, inject } from '@angular/core';
import { PREVIOUS_PAGE_ICON } from '../../../misc/constants/icon';
import { Language } from '../../../misc/enums/language.enum';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from '../../elements/menu/menu.interface';
import { APPLICATION_NAME } from '../../../misc/constants/application';
import { NavigationService } from '../../../services/navigation.service';
import { LANGUAGE_LOCAL_STORAGE_KEY } from '../../../misc/constants/local-storage';
import { UsersService } from '../../../services/users.service';

/**
 * @title Header Component
 * @component HeaderComponent 
 * @description The header component for the application
 */
@Component({
  selector: 'gh-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class GhHeaderComponent implements AfterContentChecked {
  /**
   * @description The translate service
   * @type {TranslateService}
   */
  private readonly translateService: TranslateService = inject(TranslateService)

  /**
   * @description The navigation service
   * @type {NavigationService}
   */
  private readonly navigationService: NavigationService = inject(NavigationService);

  /**
  * @description The users service
  * @type {UsersService}
  */
  private readonly userService: UsersService = inject(UsersService);

  /**
   * @description Navigates to the previous page
   * @returns {void}
   */
  protected readonly navigateToPreviousPage = () => this.navigationService.goToPreviousPage();

  /**
   * @description Hides the previous page button
   * @returns {void}
   */
  protected readonly hidePreviousPageButton = () => this.navigationService.hidePreviousIcon()

  /**
   * @description Redirects to the main page
   * @returns {void}
   */
  protected readonly redirectToMainPage = () => this.navigationService.redirectToMainPage();
  
  /**
   * @description The change detector reference
   * @type {ChangeDetectorRef}
   */
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef)

  /**
   * @description The previous page icon
   * @type {string}
   */
  protected readonly previousPageIcon = PREVIOUS_PAGE_ICON;

  /**
   * @description The application name
   * @type {string}
   */
  protected readonly applicationName = APPLICATION_NAME;
  
  /**
   * @description The languages menu items
   * @type {MenuItem[]}
   */
  protected readonly languagesMenuItems: MenuItem[] = Object.values(Language).map(lang => (
    {
      caption$: this.translateService.get("global.language."+lang),
      action: () => {
        localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, lang);
        this.translateService.use(lang);
        this.translateService.setDefaultLang(lang);
        if(this.userService.currentUserId)
        {
          this.userService.updateUserLanguage({userId: this.userService.currentUserId, language: lang});
        }
      }
    }
    ));

  /**
   * @inheritdoc
   */
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
 }
}
