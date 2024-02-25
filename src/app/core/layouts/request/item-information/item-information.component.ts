import { Component } from "@angular/core";
import { FileType } from "../../../elements/input/upload-image/upload-image.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMAGE_FORMAT_VALIDATION, imageFormatValidator } from "../../../../misc/validation/image-format.validator";
import { IMAGE_SIZE_VALIDATION, imageSizeValidator } from "../../../../misc/validation/image-size.validator";
import { REQUIRED_VALIDATION } from "../../../../misc/constants/validations";

/**
 * @interface ItemInformation
 * @description The item information interface
 */
interface ItemInformation {
  /**
   * @description The image of the item
   * @type {FileType}
   */
  image: FileType;

  /**
   * @description The name of the item
   * @type {string}
   */
  name:string;
}

/**
 * @class GhItemInformationComponent
 * @description The item information component for the application
 */
@Component({
  selector: 'gh-item-information',
  templateUrl: './item-information.component.html',
  styleUrl: './item-information.component.scss',
})
export class GhItemInformationComponent {
  protected readonly itemInformationForm = new FormGroup({
    image: new FormControl(<File>{}, [Validators.required, imageFormatValidator, imageSizeValidator]),
  });

  /**
   * @description The name of the upload image field
   * @type {string}
   */
  protected readonly imageField = "image";

  /**
   * @description The error messages of the upload image field
   */
  protected readonly imageErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.required"],
    [IMAGE_FORMAT_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.format"],
    [IMAGE_SIZE_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.size"]
  ]);
}
