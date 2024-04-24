import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { UPLOAD_ICON } from '../../../../misc/constants/icon';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GhImageModalComponent } from '../../../layouts/image-modal/image-modal.component';

/**
 * @constant
 * @description The maximum image size
 * @type {number}
 */
export const MAX_IMAGE_SIZE = 2000 * 100 * 1024;

/**
 * @type FileType
 * @description The type of the file
 */
export type FileType = string | ArrayBuffer;

/**
 * @interface GhFile
 * @description The file interface for the application
 */
export interface GhFile extends File {
  /**
   * @description The temporary URL of the file
   * @type {FileType}
   */
  tempUrl?: FileType;
}

/**
 * @class GhUploadImageComponent
 * @description The upload image component for the application
 */
@Component({
  selector: 'gh-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.component.scss', './../base-input-field.component.scss']
})
export class GhUploadImageComponent extends BaseInputFieldComponent<GhFile> {
  /**
   * @description The mat dialog service
   * @type {MatDialog}
   */
  private readonly matDialog: MatDialog = inject(MatDialog);

  /**
   * @description The icon for the upload image
   * @type {string}
   */
  protected readonly uploadImageIcon = UPLOAD_ICON;

  /**
   * @description backing field for the input touched
   * @type {BehaviorSubject<boolean>}
   */
  private readonly _inputTouched$ = new BehaviorSubject<boolean>(false);

  /**
   * @description The maximum size of the image in KB
   * @type {number}
   */
  protected readonly maxSize = MAX_IMAGE_SIZE/1024;

  /**
   * @description An observable of a boolean that indicates if the input is touched
   * @type {Observable<boolean>}
   */
  protected readonly inputTouched$ = this._inputTouched$.asObservable();

  /**
   * @description A reference to the input element.
   * @type {ElementRef}
   */
  @ViewChild('input', { static: true }) input: ElementRef;

  /**
   * @description Open the file explorer
   * @returns {void}
   */
  protected action(): void {
    if(!this.readonly) {
      this.input.nativeElement.click();
      this._inputTouched$.next(true);
    } else {
      this.matDialog.open(GhImageModalComponent, {
        data: { imageUrl: this.value.tempUrl },
        width: '80vw', // Adjust width as needed
        maxWidth: '100vw',
        height: 'auto',
        maxHeight: '90vh'
      });
    }
  }

  /**
   * @description Handle the file selected event
   * @param event The event that contains the selected file
   * @returns {void}
   */
  onFileSelected(event: Event): void {
    // Access the selected image file(s) from the input event
    const files: FileList = (event.target as HTMLInputElement).files;
    
    // Check if files were selected
    if (files.length > 0) {
      // Access the first selected image file
      const selectedFile = files[0];
      
      // Read the selected image file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      // Set the selectedImage property when the image file is loaded
      reader.onload = () => {
        (<GhFile>selectedFile).tempUrl = reader.result;
        this.value = selectedFile;
        this.valueChange.emit(selectedFile);
      };
    } else {
      this.value = undefined;
    }
  }
}
