import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';

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
    * @description The snackbar
    * @type {MatSnackBar}
    */
    private readonly snackBar: MatSnackBar = inject(MatSnackBar);

    private readonly translateService: TranslateService = inject(TranslateService);

    /**
     * @description Shows an error notification
     * @param message The message of the notification
     */
    errorNotification(message: string) {
        const config: MatSnackBarConfig = {
            panelClass: ['error-notification'],
        };

        this.showNotification(message, config);
    }

    /**
     * @description Shows a notification
     * @param message The message of the notification
     * @param config the configuration of the notification
     */
    private showNotification(message: string, config?: MatSnackBarConfig) {
        const defaultConfig: MatSnackBarConfig = {
          horizontalPosition: 'center', 
          verticalPosition: 'top',
        };

        this.translateService.get(message).pipe(
            tap(m => this.snackBar.open(m, CLOSE_ACTION, {...defaultConfig, ...config}))
        ).subscribe();
      }
}