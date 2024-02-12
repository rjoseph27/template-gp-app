import { Component, Input, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * @class GhTermsAndConditionsComponent
 * @description Component for terms and conditions
 */
@Component({
  selector: 'gh-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class GhTermsAndConditionsComponent {
  /**
   * @description Injects the MatDialogRef
   * @param dialogRef
   */
  private dialogRef: MatDialogRef<GhTermsAndConditionsComponent> = inject(MatDialogRef);
  
  /**
   * @description A method that close the modal.
   * @returns void
   */
  closeModal(): void {
    this.dialogRef.close();
  }
}
