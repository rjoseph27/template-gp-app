import { Component } from "@angular/core";
import { FileType } from "../../../elements/input/upload-image/upload-image.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMAGE_FORMAT_VALIDATION, imageFormatValidator } from "../../../../misc/validation/image-format.validator";
import { IMAGE_SIZE_VALIDATION, imageSizeValidator } from "../../../../misc/validation/image-size.validator";
import { MAX_VALIDATION, MIN_VALIDATION, REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { GroupedSelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { LIST_ITEM_CATEGORY } from "../../../../misc/constants/item-category";
import { ItemCategory } from "../../../../misc/enums/item-category.enum";
import { EnumUtil } from "../../../../misc/util/enum.util";
import { MAX_LUGGAGE_WEIGHT } from "../../../../misc/constants/application";

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
    itemCategory: new FormControl('', [Validators.required]),
    itemWeight: new FormControl(undefined, [Validators.required, Validators.min(0), Validators.max(MAX_LUGGAGE_WEIGHT)]),
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
   * @description The name of the item weight field
   * @type {string}
   */
  protected readonly itemWeightField = "itemWeight"

  /**
   * @description The maximum luggage weight
   * @type {number}
   */
  protected readonly maxLuggageWeight = MAX_LUGGAGE_WEIGHT;

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
   * @description The error messages of the item weight field
   * @type {Map<string, string>}
   */
  protected readonly itemWeightErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemWeight.errors.required"],
    [MAX_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemWeight.errors.max"],
    [MIN_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemWeight.errors.min"]
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
