import { Injectable, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Language } from "../misc/enums/language.enum";
import { LANGUAGE_LOCAL_STORAGE_KEY } from "../misc/constants/local-storage";
import { BehaviorSubject } from "rxjs";

/**
 * @class GlobalTranslateService
 * @description The global translate service
 */
@Injectable()
export class GlobalTranslateService {
  /**
   * @description The translate service
   * @type {TranslateService}
   */
  private readonly translateService: TranslateService = inject(TranslateService);

  /**
   * @description Backing field for the current language
   */
  private readonly _currentLanguage$ = new BehaviorSubject<Language>(undefined);

  /**
   * @description An observable for the current language
   * @type {Observable<Language>}
   */
  readonly currentLanguage$ = this._currentLanguage$.asObservable();

  /**
   * @description Change the language throughout the application
   * @param language The new language
   */
  changeLanguage(language: Language): void {
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, language);
    this.translateService.setDefaultLang(language);
    this._currentLanguage$.next(language);
    // NOTE: If the language doen't change in the UI, please update the json files in the assets/i18n folder.
  }
}