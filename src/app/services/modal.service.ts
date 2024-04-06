import { Injectable, inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { GhAlertComponent } from "../core/elements/alert/alert.component";
import { firstValue } from "../misc/function/firstValue";

/**
 * @interface ModalTemplate
 * @description An interface for the modal
 */
export interface ModalTemplate {
    /**
     * @description The title of the modal
     * @type {string}  
     */
    title: string;

    /**
     * @description The text of the modal
     * @type {string}
     */
    text: string;

    /**
     * @description The confirm caption of the modal
     * @type {string}
     */
    confirmCaption?: string;

    /**
     * @description The cancel caption of the modal
     * @type {string}
     */
    cancelCaption?: string;
}

/**
 * @class ModalService
 * @description The service that handle the modal
 */
@Injectable()
export class ModalService {
    /**
     * @description The dialog service
     * @type {MatDialog}
     */
    private dialog: MatDialog = inject(MatDialog);

    /**
     * @description A method that open the dialog
     * @returns {Observable<boolean>}
     */
    openModal(modalDetail: ModalTemplate): Promise<boolean> {
        const dialogRef = this.dialog.open(GhAlertComponent , { data: modalDetail });
        return firstValue(dialogRef.afterClosed());
    }
}