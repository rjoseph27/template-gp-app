import { AfterContentChecked, ChangeDetectorRef, Component, inject } from '@angular/core';
import { PREVIOUS_PAGE_ICON } from '../../../misc/constants/icon';
import { Language } from '../../../misc/enums/language.enum';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from '../../elements/menu/menu.interface';
import { APPLICATION_NAME } from '../../../misc/constants/application';

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
  private readonly translate: TranslateService = inject(TranslateService)

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
      caption$: this.translate.get("global.language."+lang),
      action: () => {
        localStorage.setItem("lang", lang);
        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
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
