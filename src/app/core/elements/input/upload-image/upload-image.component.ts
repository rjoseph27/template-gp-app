import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field.component';
import { UPLOAD_ICON } from '../../../../misc/constants/icon';
import { BehaviorSubject } from 'rxjs';

/**
 * @constant
 * @description The maximum image size
 * @type {number}
 */
export const MAX_IMAGE_SIZE = 25 * 1024; // 25KB

/**
 * @type FileType
 * @description The type of the file
 */
export type FileType = string | ArrayBuffer;

/**
 * @class GhUploadImageComponent
 * @description The upload image component for the application
 */
@Component({
  selector: 'gh-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.component.scss', './../base-input-field.component.scss']
})
export class GhUploadImageComponent extends BaseInputFieldComponent<File> {
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
  protected openFileExplorer(): void {
    this.input.nativeElement.click();
    this._inputTouched$.next(true);
  }

  /**
   * @description backing field for the selected image
   * @type {BehaviorSubject<FileType>}
   */
  private readonly _selectedImage$ = new BehaviorSubject<FileType>(undefined);

  /**
   * @description An observable of the selected image
   * @type {Observable<FileType>}
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
      this.value = selectedFile;
      this.valueChange.emit(selectedFile);
      
      // Read the selected image file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      // Set the selectedImage property when the image file is loaded
      reader.onload = () => {
        this._selectedImage$.next(reader.result);
      };
    } else {
      this._selectedImage$.next(undefined);
    }
  }
}
