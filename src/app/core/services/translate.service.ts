import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GpHubTranslateService {
    /**
     * @constructor
     * @param {TranslateService} translate The translate service
     */
    constructor(private readonly translate: TranslateService) {
        const langAttribute = document.documentElement.lang || navigator.language;
        translate.setDefaultLang(langAttribute);
        translate.use(langAttribute);
      }

}
