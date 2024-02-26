import { AbstractControl, ValidatorFn } from "@angular/forms";
import { MAX_IMAGE_SIZE } from "../../core/elements/input/upload-image/upload-image.component";

/**
 * @constant
 * @description The name of the validation that ensure that the field is a valid image size.
 */
export const IMAGE_SIZE_VALIDATION = 'imageSize';

/**
 * @constant
 * @description A validator function that checks if the image size is valid
 */
export const imageSizeValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    const maxSize = MAX_IMAGE_SIZE;

      if (file) {
        const fileSize = file.size;
        if (fileSize > maxSize) {
          return { imageSize: maxSize };
        }
      }
      return null;
  };
