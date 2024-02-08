import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

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
   * @constructor
   * @param translate The translate service
   */
  constructor(private readonly translate: TranslateService) {
    const langAttribute = document.documentElement.lang || navigator.language;
    this.translate.use(localStorage.getItem("lang") || langAttribute);
  }
}
