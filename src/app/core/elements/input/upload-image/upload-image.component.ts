import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { UPLOAD_ICON } from '../../../../misc/constants/icon';
import { BehaviorSubject } from 'rxjs';

/**
 * @type FileType
 * @description The type of the file
 */
type FileType = string | ArrayBuffer;

/**
 * @class GhUploadImageComponent
 * @description The upload image component for the application
 */
@Component({
  selector: 'gh-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.component.scss']
})
export class GhUploadImageComponent extends BaseInputFieldComponent<FileType> {
  /**
   * @description The icon for the upload image
   * @type {string}
   */
  protected readonly uploadImageIcon = UPLOAD_ICON

  /**
   * @description A reference to the input element.
   * @type {ElementRef}
   */
  @ViewChild('input', { static: true }) input: ElementRef;

  /**
   * @description Open the file explorer
   * @returns {void}
   */
  protected openFileExplorer(): void {
    this.input.nativeElement.click();
  }

  private set selectedImage(value: FileType) {
    this._selectedImage$.next(value);
    this.value = value as any;
  }

  /**
   * @description backing field for the selected image
   * @type {BehaviorSubject<string | ArrayBuffer>}
   */
  private readonly _selectedImage$ = new BehaviorSubject<string | ArrayBuffer>(undefined);

  /**
   * @description An observable of the selected image
   * @type {Observable<string | ArrayBuffer>}
   */
  protected readonly selectedImage$ = this._selectedImage$.asObservable();

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
        this.selectedImage = reader.result;
      };
    } else {
      this.selectedImage = undefined;
    }
  }
}
