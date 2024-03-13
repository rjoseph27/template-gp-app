import { Injectable, inject } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateService } from '@ngx-translate/core';
import { GlobalTranslateService } from './global-translate.service';

/**
 * @class ToRootTranslationHandler
 * @description If a child module is missing a translation, this handler will attempt to load it from the root module
 */
@Injectable()
export class ToRootTranslationHandler implements MissingTranslationHandler {
  /**
   * @description The global translate service
   * @type {GlobalTranslateService}
   */
  private readonly globalTranslateService = inject(GlobalTranslateService);

  /** @inheritdoc */
  handle(params: MissingTranslationHandlerParams) {
    return this.globalTranslateService.getRootTranslation(params.key, params.interpolateParams);
  }
}