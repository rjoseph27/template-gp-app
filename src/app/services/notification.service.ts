import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavigationService } from './navigation.service';

/**
 * @constant
 * @description The action to close the notification
 */
const CLOSE_ACTION = 'X';

/**
 * @class NotificationService
 * @description The notification service
 */
@Injectable()
export class NotificationService {
    /**
    * @description The navigation service
    * @type {NavigationService}
    */
    private readonly navigationService: NavigationService = inject(NavigationService)

    /**
    * @description The snackbar
    * @type {MatSnackBar}
    */
    private readonly snackBar: MatSnackBar = inject(MatSnackBar);

    /**
     * @description The router service
     * @type {Router}
     */
    private readonly router: Router = inject(Router);

    /**
     * @description The translate service
     * @type {TranslateService}
     */
    private readonly translateService: TranslateService = inject(TranslateService);

    /**
     * @description Shows an error notification
     * @param message The message of the notification
     * @param persist Whether the notification should persist
     */
    errorNotification(message: string, persist: boolean = true) {
        const config: MatSnackBarConfig = {
            panelClass: ['error-notification'],
        };

        this.showNotification(message, config, persist);
    }

    /**
     * @description Shows a success notification
     * @param message The message of the notification
     */
    successNotification(message: string, persist: boolean = true) {
        const config: MatSnackBarConfig = {
            panelClass: ['success-notification'],
        };

        this.showNotification(message, config);
    }

    /**
     * @description Shows a notification
     * @param message The message of the notification
     * @param config the configuration of the notification
     * @param persist Whether the notification should persist
     */
    private showNotification(message: string, config?: MatSnackBarConfig, persist: boolean = true) {
        const defaultConfig: MatSnackBarConfig = {
          horizontalPosition: 'center', 
          verticalPosition: 'top',
        };

        this.translateService.get(message).pipe(
            tap(m => this.snackBar.open(m, CLOSE_ACTION, {...defaultConfig, ...config}))
        ).subscribe();

        this.navigationService.isNotificationOpen = persist;
      }

    /**
     * @constructor
     */
    constructor() {
        this.router.events.subscribe((e) => {
            if(e instanceof NavigationEnd) {
                if((<NavigationEnd>e).url !== this.navigationService.lastUrl) {
                    if(!this.navigationService.isNotificationOpen) {
                        this.snackBar.dismiss();
                    }
                    if(this.navigationService.isNotificationOpen) {
                        this.navigationService.isNotificationOpen = false;
                    }
                    this.navigationService.lastUrl = (<NavigationEnd>e).url
                }
            }
        })
    }
}