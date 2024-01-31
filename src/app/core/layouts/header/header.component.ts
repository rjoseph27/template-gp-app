import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { PREVIOUS_PAGE_ICON } from '../../constants/icon';
import { Language } from '../../enum/language.enum';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from '../../elements/menu/menu.interface';
import { APPLICATION_NAME } from '../../constants/application';

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
      caption$: this.translate.get("global.language."+lang),
      action: () => {
        localStorage.setItem("lang", lang);
        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
      }
    }
    ));

  /**
     * @constructor
     * @param {TranslateService} translate The translate service
     * @param {ChangeDetectorRef} changeDetectorRef The change detector reference
     */
  constructor(
    private readonly translate: TranslateService, 
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  /**
   * @inheritdoc
   */
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
 }
}
