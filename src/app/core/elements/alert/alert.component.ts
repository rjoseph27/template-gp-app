import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalTemplate } from '../../../services/modal.service';
import { CLOSE_ICON } from '../../../misc/constants/icon';

/**
 * @class GhAlertComponent
 * @description The alert component for the application
 */
@Component({
  selector: 'gh-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class GhAlertComponent {
  /**
   * @description Injects the MatDialogRef
   * @param dialogRef
   */
  private dialogRef: MatDialogRef<GhAlertComponent> = inject(MatDialogRef);

  /**
   * @description The close icon
   * @type {string}
   */
  protected readonly closeIcon = CLOSE_ICON;

  /**
   * @constructor
   * @param data The data to be injected
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalTemplate) {}
  
  /**
   * @description A method that cancel the action.
   * @returns void
   */
  cancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * @description A method that confirm the action.
   * @returns void
   */
  confirm(): void {
    this.dialogRef.close(true);
  }
}
