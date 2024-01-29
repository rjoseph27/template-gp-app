import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { TranslateService } from '@ngx-translate/core';

/**
 * @title Application Component
 * @component AppComponent
 * @description This is the basic component of the application
 */
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CoreModule, RouterOutlet]
})
export class AppComponent {
}
