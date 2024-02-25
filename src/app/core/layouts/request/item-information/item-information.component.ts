import { Component } from "@angular/core";
import { FileType } from "../../../elements/input/upload-image/upload-image.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMAGE_FORMAT_VALIDATION, imageFormatValidator } from "../../../../misc/validation/image-format.validator";
import { IMAGE_SIZE_VALIDATION, imageSizeValidator } from "../../../../misc/validation/image-size.validator";
import { REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { GroupedSelectFieldOption } from "../../../elements/input/drop-down/select-field/select-field.component";
import { LIST_ITEM_CATEGORY } from "../../../../misc/constants/item-category";
import { ItemCategory } from "../../../../misc/enums/item-category.enum";
import { EnumUtil } from "../../../../misc/util/enum.util";

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
    itemName: new FormControl('', [Validators.required]),
    itemCategory: new FormControl('', [Validators.required])
  });

  /**
   * @description The name of the upload image field
   * @type {string}
   */
  protected readonly imageField = "image";

  /**
   * @description The name of the item name field
   * @type {string}
   */
  protected readonly itemNameField = "itemName"

  /**
   * @description The name of the item category field
   * @type {string}
   */
  protected readonly itemCategoryField = "itemCategory";

  /**
   * @description The error messages of the upload image field
   */
  protected readonly imageErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.required"],
    [IMAGE_FORMAT_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.format"],
    [IMAGE_SIZE_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.size"]
  ]);

  /**
   * @description The error messages of the item name field
   * @type {Map<string, string>}
   */
  protected readonly itemNameErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemName.errors.required"]
  ]);

  /**
   * @description The error messages of the item category field
   * @type {Map<string, string>}
   */
  protected readonly itemCategoryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemCategory.errors.required"]
  ]);

  /**
   * @description The item information select options
   * @type {GroupedSelectFieldOption[]}
   */
  protected itemInformationSelectOptions: GroupedSelectFieldOption[] = LIST_ITEM_CATEGORY.map(category => {
    return {
      label: category.name,
      options: Object.values(ItemCategory)
      .filter(x => x[0] === category.prefix)
      .map((key: string) => ({label: EnumUtil.getKeyByValue(ItemCategory, key), value: key}))
    }
  })
}
