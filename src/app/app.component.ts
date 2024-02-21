import { Component, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LoadingService } from "./services/loading.service";
import { LANGUAGE_LOCAL_STORAGE_KEY } from "./misc/constants/local-storage";

/**
 * @title Application Component
 * @component AppComponent
 * @description This is the basic component of the application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * @description The loading service
   * @returns {LoadingService}
   */
  protected readonly loadingService: LoadingService = inject(LoadingService);

  /**
   * @description The translate service
   * @type {TranslateService}
   */
  private readonly translate: TranslateService = inject(TranslateService);

  /**
   * @constructor
   */
  constructor() {
    const langAttribute = document.documentElement.lang || navigator.language;
    this.translate.use(localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY) || langAttribute);
  }
}
