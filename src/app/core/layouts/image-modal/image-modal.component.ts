import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @component GhImageModalComponent
 * @title The Image Modal component
 * @description The layout for an image modal
 */
@Component({
  selector: 'gh-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class GhImageModalComponent {
  /**
   * @constructor
   * @param data The data to be passed to the modal
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}
}