import { Component, inject } from '@angular/core';
import { BaseInputFieldComponent } from '../input/base-input-field.component';
import { MatDialog } from '@angular/material/dialog';
import { GhHsCodeTreeComponent } from './hs-code-tree/hs-code-tree.component';

/**
 * @class GhSelectionTreeComponent
 * @description The selection tree component
 */
@Component({
  selector: 'gh-selection-tree',
  templateUrl: './selection-tree.component.html',
  styleUrls: ['../input/base-input-field.component.scss']
})
export class GhSelectionTreeComponent extends BaseInputFieldComponent<string> {
  /**
   * @description The dialog service
   * @type {MatDialog}
   */
  private readonly dialog: MatDialog = inject(MatDialog);

  /**
   * @description Open the modal for the tree
   * @returns {void}
   */
  protected openModal(): void {
    const dialogRef = this.dialog.open(GhHsCodeTreeComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.value = result; 
        this.valueChange.emit(result);
      }
    });
  }
}
